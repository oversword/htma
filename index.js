
Array.prototype.sliceAt = function (until) {
	const i = this.findIndex(until)
	if (i === -1)
		return this
	return this.slice(0,i)
}
String.prototype.repeat = function (n) {
	let ret = ''
	for (let i=0; i<n; i++)
		ret += this
	return ret
}

const encodeEntities = (() => {
	const HTMLEntities = {
		"<": "lt",
		">": "gt",
		"&": "amp",
		'"': "quot",
		"'": "apos",
		"¢": "cent",
		"£": "pound",
		"¥": "yen",
		"€": "euro",
		"©": "copy",
		"®": "reg",
		"Á": "Aacute",
		"á": "aacute",
		"Â": "Acirc",
		"â": "acirc",
		"´": "acute",
		"Æ": "AElig",
		"æ": "aelig",
		"À": "Agrave",
		"à": "agrave",
		"Α": "Alpha",
		"α": "alpha",
		"∧": "and",
		"∠": "ang",
		"Å": "Aring",
		"å": "aring",
		"≈": "asymp",
		"Ã": "Atilde",
		"ã": "atilde",
		"Ä": "Auml",
		"ä": "auml",
		"„": "bdquo",
		"Β": "Beta",
		"β": "beta",
		"¦": "brvbar",
		"•": "bull",
		"∩": "cap",
		"Ç": "Ccedil",
		"ç": "ccedil",
		"¸": "cedil",
		"Χ": "Chi",
		"χ": "chi",
		"ˆ": "circ",
		"♣": "clubs",
		"≅": "cong",
		"↵": "crarr",
		"∪": "cup",
		"¤": "curren",
		"†": "dagger",
		"‡": "Dagger",
		"↓": "darr",
		"°": "deg",
		"Δ": "Delta",
		"δ": "delta",
		"♦": "diams",
		"÷": "divide",
		"É": "Eacute",
		"é": "eacute",
		"Ê": "Ecirc",
		"ê": "ecirc",
		"È": "Egrave",
		"è": "egrave",
		"∅": "empty",
		" ": "emsp",
		" ": "ensp",
		"Ε": "Epsilon",
		"ε": "epsilon",
		"≡": "equiv",
		"Η": "Eta",
		"η": "eta",
		"Ð": "ETH",
		"ð": "eth",
		"Ë": "Euml",
		"ë": "euml",
		"∃": "exist",
		"ƒ": "fnof",
		"∀": "forall",
		"½": "frac12",
		"¼": "frac14",
		"¾": "frac34",
		"Γ": "Gamma",
		"γ": "gamma",
		"≥": "ge",
		"↔": "harr",
		"♥": "hearts",
		"…": "hellip",
		"Í": "Iacute",
		"í": "iacute",
		"Î": "Icirc",
		"î": "icirc",
		"¡": "iexcl",
		"Ì": "Igrave",
		"ì": "igrave",
		"∞": "infin",
		"∫": "int",
		"Ι": "Iota",
		"ι": "iota",
		"¿": "iquest",
		"∈": "isin",
		"Ï": "Iuml",
		"ï": "iuml",
		"Κ": "Kappa",
		"κ": "kappa",
		"Λ": "Lambda",
		"λ": "lambda",
		"«": "laquo",
		"←": "larr",
		"⌈": "lceil",
		"“": "ldquo",
		"≤": "le",
		"⌊": "lfloor",
		"∗": "lowast",
		"◊": "loz",
		"‎": "lrm",
		"‹": "lsaquo",
		"‘": "lsquo",
		"¯": "macr",
		"—": "mdash",
		"µ": "micro",
		"−": "minus",
		"Μ": "Mu",
		"μ": "mu",
		"∇": "nabla",
		" ": "nbsp",
		"–": "ndash",
		"≠": "ne",
		"∋": "ni",
		"¬": "not",
		"∉": "notin",
		"⊄": "nsub",
		"Ñ": "Ntilde",
		"ñ": "ntilde",
		"Ν": "Nu",
		"ν": "nu",
		"Ó": "Oacute",
		"ó": "oacute",
		"Ô": "Ocirc",
		"ô": "ocirc",
		"Œ": "OElig",
		"œ": "oelig",
		"Ò": "Ograve",
		"ò": "ograve",
		"‾": "oline",
		"Ω": "Omega",
		"ω": "omega",
		"Ο": "Omicron",
		"ο": "omicron",
		"⊕": "oplus",
		"∨": "or",
		"ª": "ordf",
		"º": "ordm",
		"Ø": "Oslash",
		"ø": "oslash",
		"Õ": "Otilde",
		"õ": "otilde",
		"⊗": "otimes",
		"Ö": "Ouml",
		"ö": "ouml",
		"¶": "para",
		"∂": "part",
		"‰": "permil",
		"⊥": "perp",
		"Φ": "Phi",
		"φ": "phi",
		"Π": "Pi",
		"π": "pi",
		"ϖ": "piv",
		"±": "plusmn",
		"′": "prime",
		"″": "Prime",
		"∏": "prod",
		"∝": "prop",
		"Ψ": "Psi",
		"ψ": "psi",
		"√": "radic",
		"»": "raquo",
		"→": "rarr",
		"⌉": "rceil",
		"”": "rdquo",
		"⌋": "rfloor",
		"Ρ": "Rho",
		"ρ": "rho",
		"‏": "rlm",
		"›": "rsaquo",
		"’": "rsquo",
		"‚": "sbquo",
		"Š": "Scaron",
		"š": "scaron",
		"⋅": "sdot",
		"§": "sect",
		"­": "shy",
		"Σ": "Sigma",
		"σ": "sigma",
		"ς": "sigmaf",
		"∼": "sim",
		"♠": "spades",
		"⊂": "sub",
		"⊆": "sube",
		"∑": "sum",
		"⊃": "sup",
		"¹": "sup1",
		"²": "sup2",
		"³": "sup3",
		"⊇": "supe",
		"ß": "szlig",
		"Τ": "Tau",
		"τ": "tau",
		"∴": "there4",
		"Θ": "Theta",
		"θ": "theta",
		"ϑ": "thetasym",
		" ": "thinsp",
		"Þ": "THORN",
		"þ": "thorn",
		"˜": "tilde",
		"×": "times",
		"™": "trade",
		"Ú": "Uacute",
		"ú": "uacute",
		"↑": "uarr",
		"Û": "Ucirc",
		"û": "ucirc",
		"Ù": "Ugrave",
		"ù": "ugrave",
		"¨": "uml",
		"ϒ": "upsih",
		"Υ": "Upsilon",
		"υ": "upsilon",
		"Ü": "Uuml",
		"ü": "uuml",
		"Ξ": "Xi",
		"ξ": "xi",
		"Ý": "Yacute",
		"ý": "yacute",
		"ÿ": "yuml",
		"Ÿ": "Yuml",
		"Ζ": "Zeta",
		"ζ": "zeta",
		"‍": "zwj",
		"‌": "zwnj",
	}

	const encodeEntity = (s = "") => {
		const ent = HTMLEntities[s]
		if (ent) return "&"+ent+";"
		const code = s.charCodeAt(0)
		if (code > 127)
			return "&#"+code.toString()+";"
		return s
	}

	const encodeEntities = (str = "") => [...str].map(encodeEntity).join('')

	return encodeEntities
})()

class HTMA_Executor {
	#keyword_list = ['true','false','typeof','instanceof','Math','Object','Array','Boolean','String']
	#keywords = {}
	constructor() {
		this.#keywords = Object.fromEntries(this.#keyword_list.map(kw => [kw,1]))
	}

	static evaluate_expression = (
		exp, internal_props,
		// Override globals to disallow access from inside the eval
		{ window, globals, global, document } = {}
	) => {
		let result
		eval(`result = (${exp})`)
		return result
	}

	rebase_vars (expression, newBase) {

		let replace_feed = expression
		let replace_result = ''
		const repl_match = match => {
			const str = match[0]
			replace_result += replace_feed.slice(0, match.index)
			replace_result += str in this.#keywords ? str : `${newBase}.${str}`
			replace_feed = replace_feed.slice(match.index + str.length)
		}

		// Prefix variable names at the start of the string, only do this once
		const firstMatch = replace_feed.match(/^([a-z_]+[a-z0-9_]*)/i)
		if (firstMatch) repl_match(firstMatch)

		// Prefix variables after the first one, do his until there are no more
		while (replace_feed.length) {
			const m = replace_feed.match(/(?<=[\[\s&|^\(\+\/\*\-,:])([a-z_]+[a-z0-9_]*)/i)
			if (m) repl_match(m)
			else break
		}

		// Add on anything left over after the last variable reference
		replace_result += replace_feed

		return replace_result
	}

	exec (expression, internal_props) {
		return HTMA_Executor.evaluate_expression(this.rebase_vars(expression, 'internal_props'), {...internal_props})
	}
}

class HTMA_Scope {
	#string = ''
	constructor (string = '', props = {}, executor) {
		this.#string = string
		this.#props = {...props}
		this.#executor = executor || new HTMA_Executor()
	}


	#props = {}
	get props() {
		return {...this.#props}
	}
	#executor
	exec(expression) {
		return this.#executor.exec(expression, {...this.#props})
	}


	#conditions = {}
	condition (indent, exact = false) {
		if (exact)
			return this.#conditions[indent]
		return !Object.entries(this.#conditions)
			.some(([i,v]) => parseInt(i) < indent && v === false)
	}
	setCondition (indent, condition) {
		this.#conditions[indent] = condition
	}
	get conditions() {
		return {...this.#conditions}
	}
	get currentCondition() {
		const indent_parent = this.#reading.find(({ data = {} }) => 'indent' in data)
		return indent_parent ? this.condition(indent_parent.data.indent) : undefined
	}


	#reading = [{type:syntax.INDENT}]
	get reading() {
		return [...this.#reading]
	}
	start_reading (type, data = false) {
		this.#reading.unshift({ type, ...(data ? {data} : {}) })
	}
	stop_reading (type, force = false) {
		const i = this.#reading.findIndex(e => e.type === type)
		if (i === -1 && !force)
			throw new Error(`${type} cannot be stopped as it is not currently being read.`)
		if (i !== 0 && !force)
			throw new Error(`${type} cannot be stopped as it is not the most recent item being read, use force=true if you want this to stop anyway.`)
		this.#reading = this.#reading.slice(i+1)
	}
	is_reading (type, parents = false) {
		if (parents)
			return this.#reading.some(e => e.type === type)
		return this.#reading[0] && this.#reading[0].type === type
	}
	get_all_reading_data(type = false, until = false) {
		const set = type === false
			? this.#reading
			: this.#reading.filter(e => e.type === type)
		const data = set.map(({ data }) => data || {})
		if (until === false)
			return data
		return data.sliceAt(until)
	}
	get_reading_data(type, check = false) {
		const e = this.#reading.find(e => e.type === type && (!check || check(e.data || {})))
		return (e && e.data) || {}
	}
	get reading_data () {
		return (this.#reading[0] && this.#reading[0].data) || {}
	}


	#reserve = ''
	set reserve (newReserve) {
		this.#reserve = newReserve
	}
	get reserve () {
		return this.#reserve
	}

	#buffer = ''
	get buffer () {
		const read = this.#buffer
		this.#buffer = ''
		return read
	}
	set buffer(newBuffer){
		this.#buffer = newBuffer
	}

	#output = ''
	get output() {
		return this.#output
	}
	set output(newOutpt) {
		this.#reserve = ''
		if (this.currentCondition !== false)
			this.#output = newOutpt
	}


	get data() {
		return {
			buffer: this.#buffer,
			output: this.#output,
			reading: [...this.#reading],
			conditions: Object.entries(this.#conditions),
			conditional: this.currentCondition,
		}
	}

	#index = -1
	get index() {
		return this.#index
	}
	get next() {
		this.#index++
		return this.currentCharacter
	}
	get currentCharacter() {
		return this.#string[this.#index]
	}
	get followingCharacter() {
		return this.#string[this.#index+1]
	}

	#writer = {}
	set writer(newWriter) {
		this.#writer = newWriter(this)
	}
	get writer() {
		return {...this.#writer}
	}
}


const syntax = {
	CONTENT: 'content',
	INDENT: 'indent',
	TAG: 'tag',
	TAGNAME: 'tagname',
	CLASS: 'class',
	ID: 'id',
	TAGCONTENT: 'tagcontent',
	ATTR: 'attribute',
	ATTRNAME: 'attributename',
	ATTRVAL: 'attributevalue',
	STRING: 'string',
	ESCAPE: 'escape',
	LOOP: 'loop'
}

const tags = {
	IF: 'if',
	VAR: 'var',
	ELSE: 'else',
	ELSEIF:'elseif',
	FOR:'for'
}

const tagAliases = {
	[tags.ELSEIF]: ['elif'],
	[tags.FOR]: ['foreach'],
	[tags.VAR]: ['print']

}

const commonAttributeAliases = {

}

const tagAttributeAliases = {
	a: {
		...commonAttributeAliases,
		href: ['h','src','url']
	}
}

const string_groups = {
	indent: [' ', '\t'],
	newline: ['\n'],
	closetag: ['>'],
	opentag: ['<'],
	classseparator:['.'],
	idmarker:['#'],
	quote: ['"', "'"],
	attrassign:['=',':'],
	escape: ['\\']
}
string_groups.whitespace = string_groups.indent.concat(string_groups.newline)

const tag_groups = {
	system: [tags.VAR,tags.FOR,tags.IF,tags.ELSE,tags.ELSEIF],
	condition: [tags.IF,tags.ELSE,tags.ELSEIF],
	else: [tags.ELSE,tags.ELSEIF],
	if: [tags.IF,tags.ELSEIF]
}

const string_is = (str, ...options) =>
	options.some(option => option === str || option.includes(str))

const string_is_tag = (str, ...options) =>
	[].concat(...[].concat(...options.map(option => Array.isArray(option) ? option : [option]))
		.map(option => tagAliases[option] ? [option, ...tagAliases[option]] : [option]))
		.includes(str)

const string_writer = scope => ({
	init () {
		scope.output = ''
	},
	dump () {
		return scope.output
	},
	dumpString () {
		return scope.output
	},
	open: tag => {
		const attrs = Object
				.entries(tag.attrs)
				.filter(([prop, val]) => !(prop === 'class' && val.length === 0))
				.map(([prop, val]) =>
					`${prop.toLowerCase()}${val === true ? '' : `="${encodeEntities(Array.isArray(val) ? val.join(' ') : val)}"`}`)
		scope.output += `<${tag.name}${attrs.length ? ` ${attrs.join(' ')}` : ''}>`
	},
	close: tag => {
		scope.output += `</${tag.name}>`
	},
	content: content => {
		scope.output += content
	},
	loop (loop, contents, passthrough) {
		scope.output +=
			loop.items
			.map(([ key, val ]) => htma(
				contents,
				{
					...scope.props,
					[loop.varname]: val,
					...(loop.keyname ? {[loop.keyname]: key } : {})
				},
				passthrough
			))
			.join('')
	}
})

const dom_writer = scope => ({
	init () {
		scope.output = document.createElement('htma-container')
	},
	dump () {
		return scope.output.childNodes
	},
	dumpString () {
		return scope.output.innerHTML
	},
	open: tag => {
		if (scope.currentCondition === false)
			return
		const newEl = document.createElement(tag.name)
		Object
				.entries(tag.attrs)
				.filter(([prop, val]) => !(prop === 'class' && val.length === 0))
				.forEach(([prop, val]) => {
					newEl.setAttribute(prop, Array.isArray(val) ? val.join(' ') : val)
				})
		tag.element = newEl
		const ancestor = scope.get_reading_data(syntax.TAG,
			({ name, indent }) => !string_is_tag(name, tag_groups.system) && indent < tag.indent).element || scope.output
		ancestor.appendChild(newEl)
	},
	close: tag => {
		// not needed, no-op
	},
	content: content => {
		if (scope.currentCondition === false)
			return
		const ancestor = scope.get_reading_data(syntax.TAG,
			({ name, indent }) => !string_is_tag(name, tag_groups.system)).element || scope.output
		const newEl = document.createTextNode(content)
		ancestor.appendChild(newEl)
	},
	loop: (loop, contents, passthrough) => {
		if (scope.currentCondition === false)
			return

		const ancestor = scope.get_reading_data(syntax.TAG,
			({ name, indent }) => !string_is_tag(name, tag_groups.system)).element || scope.output

		loop.items
			.map(([ key, val ]) => htma(
				contents,
				{
					...scope.props,
					[loop.varname]: val,
					...(loop.keyname ? {[loop.keyname]: key } : {})
				},
				{ ...passthrough, outputString: false }
			))
			.forEach(els => {
				ancestor.append(...els)
			})
	}
})


const actions = {
	open_tag(scope, tag) {
		const conditional = scope.currentCondition
		if (conditional === false)
			return
		if (string_is_tag(tag.name, tag_groups.system)) {
			if (string_is_tag(tag.name, tag_groups.else) && scope.condition(tag.indent, true)) {
				tag.eval = false
			} else
			if (string_is_tag(tag.name, tags.ELSE)) {
				tag.eval = true
			} else
			if (string_is_tag(tag.name, tags.FOR)) {
				let result = []
				if (tag.attrs.in) {
					result = scope.exec(tag.attrs.in)
				} else
				if (tag.attrs.to) {
					const start = tag.attrs.from ? scope.exec(tag.attrs.from) : 0
					const range = scope.exec(tag.attrs.to) - start
					const inc = tag.attrs.inc ? scope.exec(tag.attrs.inc) : Math.sign(range)
					if (Math.sign(range) !== Math.sign(inc)) {
						throw new Error('Infinite loop detected')
					}
					result = Array(Math.ceil(range/inc)).fill(0).map((v,k) => start+(k*inc))
				}

				if (typeof result === 'string') {
					result = [...result]
				}
				if (Array.isArray(result)) {
					result = result.map((val, index) => [ index, val ])
				} else
				if (typeof result === 'object') {
					result = Object.entries(result)
				} else
				{
					throw new Error(`This structure is not iterable`)
				}


				scope.start_reading(syntax.LOOP, {
					varname:tag.attrs.id,
					keyname:tag.attrs.key,
					items:result,
					indent: 0,
					index: scope.index
				})
			} else
			{
				const exp = tag.attrs.exp
					? tag.attrs.exp
					: tag.attrs.id+(tag.attrs.class.length ? ('.'+tag.attrs.class.join('.')) : '')
				const result = scope.exec(exp)
				if (string_is_tag(tag.name, tags.VAR)) {
					scope.stop_reading(syntax.TAG)
					// reading attr value? send to buffer
					if (scope.is_reading(syntax.ATTRVAL, true)) {
						scope.buffer += result.toString()
					} else
					// reading tag content? assume attrname
					if (scope.is_reading(syntax.TAGCONTENT)) {
						scope.buffer += result.toString()
						scope.start_reading(syntax.ATTR)
						scope.start_reading(syntax.ATTRNAME)
					} else
					// Reading nothing? start reading content
					{
						scope.buffer += result.toString()
						if (!scope.is_reading(syntax.CONTENT))
							scope.start_reading(syntax.CONTENT)
					}
				} else
				{
					tag.eval = string_is_tag(tag.name, tag_groups.condition) ? Boolean(result) : result
				}
			}
		}
		if (conditional !== false && !string_is_tag(tag.name, tag_groups.system)) {
			scope.writer.open(tag)
		}
		if (string_is_tag(tag.name, tag_groups.condition) || scope.condition(tag.indent, true) !== undefined) {
			scope.setCondition(tag.indent, tag.eval)
		}
	},
	close_tags(scope, min_indent) {
		const siblings_and_nephews = scope.get_all_reading_data(syntax.TAG, ({ indent }) => indent < min_indent)
		siblings_and_nephews
			.forEach(tag => {
				const { indent, name } = tag
				const print_close = name && scope.condition(indent) !== false && !string_is_tag(name, tag_groups.system)
				scope.stop_reading(syntax.TAG, true)
				if (print_close)
					scope.writer.close(tag)
			})
	},
	render_loop(scope, loop, passthrough) {
		const contents = scope.buffer+scope.currentCharacter
		scope.writer.loop(loop, contents, passthrough)
		scope.buffer = ' '.repeat(loop.indent)
		scope.stop_reading(syntax.LOOP)
		scope.start_reading(syntax.INDENT)
	}
}

const conditions = [
	{
		reading: syntax.LOOP,
		action(scope, { debug, ...passthrough }) {
			const tag = scope.get_reading_data(syntax.TAG)
			const loop = scope.reading_data
			if (string_is(scope.currentCharacter, string_groups.newline)) {
				loop.indent = 0
			} else
			if (string_is(scope.currentCharacter, string_groups.indent)) {
				loop.indent += 1
			}
			if (!scope.followingCharacter || (!string_is(scope.followingCharacter, string_groups.whitespace) && loop.indent <= tag.indent)) {
				actions.render_loop(scope, loop, { debug: debug(loop.index), ...passthrough })
			} else {
				return { buffer: scope.currentCharacter }
			}
		}
	},
	{
		reading: syntax.TAGNAME,
		string: [string_groups.whitespace, string_groups.idmarker, string_groups.classseparator, string_groups.closetag],
		action(scope) {
			const tag = scope.get_reading_data(syntax.TAG)
			tag.name = scope.buffer
			scope.stop_reading(syntax.TAGNAME)

			if (string_is(scope.currentCharacter, string_groups.closetag)) {
				actions.open_tag(scope, tag)
			} else
			if (string_is(scope.currentCharacter, string_groups.idmarker)) {
				scope.start_reading(syntax.ID)
			} else
			if (string_is(scope.currentCharacter, string_groups.classseparator)) {
				scope.start_reading(syntax.CLASS)
			} else
			if (string_is(scope.currentCharacter, string_groups.whitespace)) {
				scope.start_reading(syntax.TAGCONTENT)
				if (string_is(scope.currentCharacter, string_groups.newline)) {
					scope.start_reading(syntax.INDENT)
				}
			}
		}
	},
	{
		condition(scope) {
			return scope.is_reading(syntax.TAGCONTENT, true) && scope.is_reading(syntax.ATTRNAME)
		},
		string: [string_groups.whitespace, string_groups.closetag, string_groups.attrassign],
		action(scope) {

			const tag = scope.reading[scope.reading.findIndex(({ type }) => type === syntax.TAGCONTENT)+1].data

			tag.current_attr = scope.buffer
			scope.stop_reading(syntax.ATTRNAME)

			if (string_is(scope.currentCharacter, string_groups.closetag)) {
				scope.stop_reading(syntax.ATTR)
				scope.stop_reading(syntax.TAGCONTENT, true)
				tag.attrs[tag.current_attr] = true
				actions.open_tag(scope, tag)
			} else
			if (string_is(scope.currentCharacter, string_groups.attrassign)) {
				scope.start_reading(syntax.ATTRVAL)
			} else
			if (string_is(scope.currentCharacter, string_groups.whitespace)) {
				tag.attrs[tag.current_attr] = true
				if (string_is(scope.currentCharacter, string_groups.newline)) {
					scope.start_reading(syntax.INDENT)
				}
			}
		}
	},
	{
		reading: syntax.ATTRVAL,
		string: [string_groups.whitespace, string_groups.closetag],
		action(scope) {
			const attributeCondition = scope.currentCondition
			scope.stop_reading(syntax.ATTRVAL)
			scope.stop_reading(syntax.ATTR)
			const tag = scope.reading[scope.reading.findIndex(({ type }) => type === syntax.TAGCONTENT)+1].data

			if (attributeCondition) {
				if (tag.current_attr === 'class') {
					tag.attrs.class = tag.attrs.class.concat(scope.buffer.split(' '))
				} else
				{
					tag.attrs[tag.current_attr] = scope.buffer
				}
			}

			if (string_is(scope.currentCharacter, string_groups.closetag)) {
				scope.stop_reading(syntax.TAGCONTENT)
				return actions.open_tag(scope, tag)
			} else
			if (string_is(scope.currentCharacter, string_groups.newline)) {
				scope.start_reading(syntax.INDENT)
			}
			return { setBuffer: '' }
		}
	},
	{
		condition(scope) {
			return scope.is_reading(syntax.ID) || scope.is_reading(syntax.CLASS)
		},
		string: [string_groups.whitespace, string_groups.classseparator, string_groups.closetag],
		action (scope) {
			const tag = scope.get_reading_data(syntax.TAG)
			if (scope.is_reading(syntax.ID)) {
				tag.attrs.id = scope.buffer
				scope.stop_reading(syntax.ID)
			} else
			if (scope.is_reading(syntax.CLASS)) {
				tag.attrs.class.push(scope.buffer)
				scope.stop_reading(syntax.CLASS)
			}

			if (string_is(scope.currentCharacter, string_groups.closetag)) {
				actions.open_tag(scope, tag)
			} else
			if (string_is(scope.currentCharacter, string_groups.classseparator)) {
				scope.start_reading(syntax.CLASS)
			} else
			if (string_is(scope.currentCharacter, string_groups.whitespace)) {
				scope.start_reading(syntax.TAGCONTENT)
				if (string_is(scope.currentCharacter, string_groups.newline)) {
					scope.start_reading(syntax.INDENT)
				}
			}
		},
	},
	{
		condition(scope, s) {
			return scope.is_reading(syntax.STRING, true) && scope.is_reading(syntax.ESCAPE)
		},
		action(scope){
			scope.stop_reading(syntax.ESCAPE)
			scope.buffer += '\\'+scope.currentCharacter
		}
	},
	{
		condition(scope, s) {
			return scope.is_reading(syntax.STRING) && !scope.is_reading(syntax.ESCAPE) && string_is(s, string_groups.escape)
		},
		action(scope){
			scope.start_reading(syntax.ESCAPE)
		}
	},
	{
		condition(scope, s) {
			return scope.is_reading(syntax.STRING, true) && !scope.is_reading(syntax.ESCAPE) && string_is(s, scope.get_reading_data(syntax.STRING).open)
		},
		action(scope){
			scope.stop_reading(syntax.STRING, true)
		}
	},
	{
		reading: syntax.ATTRVAL,
		string: [string_groups.quote],
		action(scope){
			scope.start_reading(syntax.STRING, { open: scope.currentCharacter })
		}
	},
	{
		condition(scope) {
			return scope.is_reading(syntax.TAGCONTENT, true)
		},
		string: [string_groups.closetag],
		action(scope) {
			const tag = scope.reading[scope.reading.findIndex(({ type }) => type === syntax.TAGCONTENT)+1].data

			scope.stop_reading(syntax.TAGCONTENT, true)
			actions.open_tag(scope, tag)

			return { setBuffer: '' }
		}
	},
	{
		string: [string_groups.opentag],
		action(scope) {
			const child_tag = {attrs:{class:[]}}
			if (scope.is_reading(syntax.INDENT)) {
				child_tag.indent = scope.buffer.length
				scope.stop_reading(syntax.INDENT)
				actions.close_tags(scope, child_tag.indent)
			} else
			if (scope.is_reading(syntax.TAGCONTENT)) {
			} else
			if (scope.is_reading(syntax.CONTENT)) {
				scope.writer.content(scope.buffer)
			}
			scope.start_reading(syntax.TAG, child_tag)
			scope.start_reading(syntax.TAGNAME)
		}
	},
	{
		string: [string_groups.newline],
		action (scope) {
			if (scope.is_reading(syntax.CONTENT)) {
				scope.writer.content(scope.buffer)
				scope.stop_reading(syntax.CONTENT)
				scope.start_reading(syntax.INDENT)
			} else
			if (scope.is_reading(syntax.INDENT)) {
			} else
			{
				scope.writer.content(scope.buffer)
				scope.start_reading(syntax.INDENT)
			}
			return { setBuffer: '' }
		}
	},
	{
		condition(scope, s) {
			return scope.is_reading(syntax.TAGCONTENT, true)
					&& scope.reading
							.sliceAt(({ type }) => type === syntax.TAGCONTENT)
							.every	(({ type }) => !string_is(type, [syntax.ATTR, syntax.TAGNAME, syntax.ID, syntax.CLASS, 'tagvalue']))
					&& !string_is(s, string_groups.whitespace)
		},
		action(scope) {
			const attr_data = {}
			if (scope.is_reading(syntax.INDENT)) {
				attr_data.indent = scope.buffer.length
				scope.stop_reading(syntax.INDENT)
			}
			scope.start_reading(syntax.ATTR, attr_data)
			scope.start_reading(syntax.ATTRNAME)
			return { setBuffer: scope.currentCharacter }
		}
	},
	{
		reading: syntax.INDENT,
		condition(scope, s) {
			return !string_is(s, string_groups.indent)
		},
		action(scope) {
			scope.stop_reading(syntax.INDENT)
			scope.start_reading(syntax.CONTENT, { indent: scope.buffer.length })
			return { setBuffer: scope.currentCharacter }
		}
	}
]


const getConditionMatcher = scope =>
	({ reading, string, condition }) => {
		const thisCharacter = scope.currentCharacter
		return (
			(!reading || scope.is_reading(reading)) &&
			(!string || string_is(thisCharacter, ...string)) &&
			(!condition || condition(scope, thisCharacter))
		)
	}
const defaultAction = scope => ({ buffer: scope.currentCharacter })

const getParserStep = (scope, passthrough) => {
	const matchingCondition = getConditionMatcher(scope)
	return () => {
		const foundCondition = conditions.find(matchingCondition)
		const action = (foundCondition ? foundCondition.action : false) || defaultAction
		const result = action(scope, passthrough)
		scope.reserve += scope.currentCharacter
		if (result) {
			if (result.setBuffer !== undefined)
				scope.buffer = result.setBuffer
			if (result.buffer !== undefined)
				scope.buffer += result.buffer
			if (result.output !== undefined)
				scope.output += result.output
		}
		return foundCondition
	}
}

const htma = (str = '', args = {}, options = {}) => {
	const { debug: debug_call = false, writer = string_writer, outputString = false } = options
	const scope = new HTMA_Scope(str, args)
	scope.writer = writer
	const debug_stack = []
	const debug = (index, chosenCondition) => {
		debug_stack.push({ index, reading: JSON.parse(JSON.stringify({ ...scope.data, chosen: chosenCondition })) })
	}
	const subDebugCall = debug_call ? (index) => (inp, sub_debug_stack) => {
		sub_debug_stack.forEach(db => {
			debug_stack.push({ index: index+1+db.index, reading: db.reading })
		})
	} : () => false
	const parse = getParserStep(scope, { debug: subDebugCall, ...options })
	scope.writer.init()
	if (debug_call)
		debug(0, -2)
	while (scope.next) {
		const foundCondition = parse()
		if (debug_call)
			debug(scope.index+1, conditions.indexOf(foundCondition))
	}
	if (scope.is_reading(syntax.CONTENT)) {
		scope.writer.content(scope.buffer)
		scope.stop_reading(syntax.CONTENT)
	}
	actions.close_tags(scope, 0)

	if (debug_call) {
		debug(str.length+1, -3)
		debug_call(str, debug_stack)
	}
	if (outputString)
		return scope.writer.dumpString()
	return scope.writer.dump()
}
