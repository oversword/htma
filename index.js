const htma = (() => {
// Enclose everything in a scope to avoid any globals

const array_sliceAt = (arr, until) => {
	const i = arr.findIndex(until)
	if (i === -1)
		return arr
	return arr.slice(0,i)
}
const array_sliceAfter = (arr, until) => {
	const i = arr.findIndex(until)
	if (i === -1)
		return arr
	return arr.slice(0,i+1)
}
const array_partition = (arr, cond) =>
	arr.reduce(([a,b], item, index, list) =>
		cond(item, index, list)
			? [[...a, item], b]
			: [a, [...b, item]], [[],[]])
const string_repeat = (s, n) => {
	let ret = ''
	for (let i=0; i<n; i++)
		ret += s
	return ret
}
const string_is = (str, ...options) =>
	[].concat(...options.map(option => Array.isArray(option) ? option : [option]))
		.includes(str)
const filter_unique = (item, index, list) => list.indexOf(item) === index
const filter_truthy = val => val

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

const invertAliasIndex = aliasIndex =>
	Object
		.entries(aliasIndex)
		.reduce((acc, [ canon, aliases ]) =>
			aliases
				.reduce((a, alias) =>
					({ ...a, [alias]: canon }), acc),
			{})

const nest_props = (props, args) =>
	new Proxy(props, {
		get (target, prop) {
			if (prop in args)
				return args[prop]
			const got = target[prop]
			if (typeof got === 'function')
				return got.bind(target)
			return got
		},
		set (target, prop, val) {
			if (prop in args)
				args[prop] = val
			else
				target[prop] = val
			return true
		}
	})

class Executor {
	#keyword_list = ['true','false','typeof','instanceof','Math','Object','Array','Boolean','String','console','undefined','null']
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
		try {
			eval(`result = (${exp})`)
		} catch (e) {
			console.error(e, exp, internal_props)
		}
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
			const m = replace_feed.match(/(?<=([\[\s&|^\(\+\/\*\-,:=!]|\.\.\.))([a-z_]+[a-z0-9_]*)/i)
			if (m) repl_match(m)
			else break
		}

		// Add on anything left over after the last variable reference
		replace_result += replace_feed

		return replace_result
	}

	exec (expression, internal_props) {
		return Executor.evaluate_expression(this.rebase_vars(expression, 'internal_props'), internal_props)
		// return Executor.evaluate_expression(this.rebase_vars(expression, 'internal_props'), {...internal_props})
	}

	prep (expression, internal_props) {
		const exp = this.rebase_vars(expression, 'internal_props')
		return args => {
			return Executor.evaluate_expression(exp, nest_props(internal_props, args))
				// { ...internal_props, ...args })
			// return Executor.evaluate_expression(exp, { ...internal_props, ...args })
		}
	}
}

class Scope {
	#string = ''
	constructor (string = '', props = {}, executor) {
		this.#string = string
		this.#props = props//{...props}
		this.#executor = executor || new Executor()
	}


	#props = {}
	get props() {
		return this.#props//{...this.#props}
	}
	#executor
	exec(expression) {
		return this.#executor.exec(expression, this.#props)//{...this.#props})
	}
	prep(expression) {
		return this.#executor.prep(expression, this.#props)//{...this.#props})
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


	#reading = []
	get reading() {
		return [...this.#reading]
	}
	get currentType() {
		return this.#reading[0] && this.#reading[0].type
	}
	start_reading (type, data = false) {
		this.#reading.unshift({ type, ...(data ? {data} : {}) })
	}
	stop_reading (type, force = false) {
		const types = Array.isArray(type) ? type : [type]
		const i = this.#reading.findIndex(e => types.includes(e.type))
		const typ = this.#reading[i].type
		if (i === -1 && !force)
			throw new Error(`${typ} cannot be stopped as it is not currently being read.`)
		if (i !== 0 && !force)
			throw new Error(`${typ} cannot be stopped as it is not the most recent item being read, use force=true if you want this to stop anyway.`)
		this.#reading = this.#reading.slice(i+1)
	}
	is_reading (type, parents = false) {
		const types = Array.isArray(type) ? type : [type]
		if (parents)
			return this.#reading.some(e => types.includes(e.type))
		return this.#reading[0] && types.includes(this.#reading[0].type)
	}
	get_all_reading_data(type = false, until = false) {
		const types = Array.isArray(type) ? type : [type]
		const set = type === false
			? this.#reading
			: this.#reading.filter(e => types.includes(e.type))
		const data = set.map(({ data }) => data || {})
		if (until === false)
			return data
		return array_sliceAt(data, until)
	}
	get_reading_data(type, check = false) {
		const types = Array.isArray(type) ? type : [type]
		const e = this.#reading.find(e => types.includes(e.type) && (!check || check(e.data || {})))
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

	get data() {
		return {
			buffer: this.#buffer,
			output: (this.#writer.dumpString || this.#writer.dump)(),
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
	#writer_instance
	set writer(newWriter) {

		// Check the writer implements the required methods
		if (!newWriter)
			throw new Error(`Writer does not provide an instance when called.`)
		if (typeof newWriter.inst !== 'function')
			throw new Error(`The writer must implement an 'inst' method that creates a new object to write data to.`)
		if (typeof newWriter.dump !== 'function')
			throw new Error(`The writer must implement a 'dump' method that outputs the result after the writing is complete.`)
		// if (typeof newWriter.open !== 'function')
		// 	throw new Error(`The writer must implement an 'open' method that is called when a tag is opened.`)
		// if (typeof newWriter.close !== 'function')
		// 	throw new Error(`The writer must implement a 'close' method that is called when a tag is closed.`)
		// if (typeof newWriter.content !== 'function')
		// 	throw new Error(`The writer must implement a 'content' method that is called when plain text content is encountered.`)
		// if (typeof newWriter.nest !== 'function')
		// 	throw new Error(`The writer must implement a 'nest' method that is called for each step of a for loop.`)


		const dump_fun = method => (...args) => method(this.#writer_instance, ...args)
		const mod_fun = method => (...args) => {
			const result = method(this.#writer_instance, ...args)
			if (typeof result !== 'undefined')
				this.#writer_instance = result
		}

		this.#writer_instance = newWriter.inst()
		this.#writer = Object.fromEntries(
			Object.entries(newWriter)
			.filter(([ name ]) => ['dump','dumpString','open','close','content','nest','write'].includes(name))
			.map(([ name, method ]) => [
				name,
				['dump','dumpString'].includes(name)
				? dump_fun(method)
				: mod_fun(method)
			])
		)
	}
	get writer() {
		return {...this.#writer}
	}
}



const custom_components = {}

const add_component = (...args) => {
	let name, str, o
	if (args.length === 1){
		const obj = args[0]
		name = obj.name
		str = obj.template
		o = obj
	}else
		[name, str, o] = args
	let defaults
	if (typeof o === 'function')
		defaults = o
	else
	if (typeof o === 'object')
		defaults = function () { return {...o} }
	else
		defaults = function () { return {} }
	custom_components[name] = {
		template: str,
		defaults
	}
}


const mergeOptions = (def, ovr) => {
	const ret = {}
	for (const k in def) {
		if (ovr[k] === null) continue
		if (
			(typeof def[k] === 'object' && !Array.isArray(def[k])) ||
			(typeof ovr[k] === 'object' && !Array.isArray(ovr[k]))
		)
			ret[k] = mergeOptions(def[k], ovr[k] || {})
		ret[k] = ovr[k] || def[k]
	}
	for (const k in ovr) {
		if (ovr[k] === null) continue
		if (k in def) continue
		if (typeof ovr[k] === 'object' && !Array.isArray(ovr[k]))
			ret[k] = mergeOptions({}, ovr[k])
		ret[k] = ovr[k]
	}
	return ret
}




const parser = (conditions, writers, syntax, string_groups) => {

	const system_syntax = ['START','END']

	const instance = {syntax}

	const getSyntax = val => system_syntax.includes(val) ? val : syntax[val]

	const syntaxCondition = (syn, reading, not_reading) =>
		(!reading || (typeof reading === 'string' && getSyntax(reading) === syn) || (Array.isArray(reading) && reading.some(read => getSyntax(read) === syn))) &&
		(!not_reading || (typeof not_reading === 'string' && getSyntax(not_reading) !== syn) || (Array.isArray(not_reading) && !not_reading.some(read => getSyntax(read) === syn)))

	const all_strings = [].concat(...Object.values(string_groups))


	const getConditionMatcher = scope =>
		({ reading, string, condition }) => {
			const thisCharacter = scope.currentCharacter
			return (
				(!reading || scope.is_reading(reading)) &&
				(!string || string_is(thisCharacter, ...string)) &&
				(!condition || condition(scope, thisCharacter))
			)
		}
	const getConditionMatcherQuick = scope =>
		({ condition }) =>
				(!condition || condition(scope, scope.currentCharacter))

	const defaultAction = scope => ({ buffer: scope.currentCharacter })



	const filter_conditions = syn =>
		Object.fromEntries(
			[[
				'default',
				array_sliceAfter(
					conditions.filter(({ reading, string, not_reading }) =>
						syntaxCondition(syn, reading, not_reading) &&
						(!string || !all_strings.some(ch => string_is(ch, ...string)))
					),
					({ condition }) => !condition
				).map(({ condition, action }) => ({ condition: condition && condition.bind(instance), action: action.bind(instance) }))
			]].concat(
				all_strings
				.map(thisCharacter => [
					thisCharacter,
					array_sliceAfter(
						conditions.filter(({ reading, string, not_reading }) =>
							syntaxCondition(syn, reading, not_reading) &&
							(!string || string_is(thisCharacter, ...string))),
						({ condition }) => !condition
					).map(({ condition, action }) => ({ condition: condition && condition.bind(instance), action: action.bind(instance) }))
				])
			)
		)

	const quick_conditions =
		Object.fromEntries(
			[[
				'default',
				filter_conditions(undefined)
			]].concat(
				Object.values(syntax).concat(['START','END'])
					.map(syn => [
						syn,
						filter_conditions(syn)
					])
			)
		)

	console.log(quick_conditions)

	const getParserStep = (scope, passthrough) => {
		const matchingConditionQuick = getConditionMatcherQuick(scope)
		const parserStepCall = () => {
			const ct = scope.currentType || 'default'
			const foundCondition = (
					quick_conditions[ct][scope.currentCharacter] ||
					quick_conditions[ct].default
				).find(matchingConditionQuick)

			const action = (foundCondition ? foundCondition.action : false) || defaultAction
			const result = action(scope, passthrough)
			scope.reserve += scope.currentCharacter
			if (result) {
				if (result.setBuffer !== undefined)
					scope.buffer = result.setBuffer
				if (result.buffer !== undefined)
					scope.buffer += result.buffer
			}
			return foundCondition
		}
		return parserStepCall
	}

	const parse = (str = '', args = {}, options = {}) => {
		const {
			debug: debug_call = false,
			writer = writers.default,
			outputString = false
		} = options

		// Init scope
		const scope = new Scope(str, args)
		scope.writer = writer

		// Set up debug stuff
		const debug_stack = []
		const debug = (index, chosenCondition) =>
			debug_call(index, JSON.parse(JSON.stringify(scope.data)), chosenCondition)
		const subDebugCall = debug_call
			? (index) => (ind, dat, ch) => debug_call(index+ind+1, dat, ch)
			: () => false

		const passthrough = { ...options, debug: subDebugCall }
		// Get a parser instance for this scope
		const parserStep = getParserStep(scope, passthrough)

		if (quick_conditions.START)
			quick_conditions.START.default
				.forEach(condition => condition.action(scope, passthrough))

		// Zero-th debug step, before any action
		if (debug_call)
			debug(0, -2)

		// Parse every character of the string one by one
		while (scope.next) {
			const foundCondition = parserStep()

			// Record each step of the parsing
			if (debug_call)
				debug(scope.index+1, conditions.indexOf(foundCondition))
		}

		if (quick_conditions.END)
			quick_conditions.END.default
				.forEach(condition => condition.action(scope, passthrough))

		// Final debug step, after all actions
		if (debug_call)
			debug(str.length+1, -3)

		// Output final result
		if (outputString && scope.writer.dumpString)
			return scope.writer.dumpString()
		return scope.writer.dump()
	}

	return parse
}


const generic_parser = (conditions, syntax) => {

}


const instance = (instanceOptions) => {
	// TODO: Extract that which is not configurable to make a generic "htma_parser"

	const attr_trans = instanceOptions.transformations.attributes || {}

	const attribute_transformer = prop => {
		const attr_tr = attr_trans[prop]
		if (attr_tr)
			return { ...attr_trans.DEFAULT, ...attr_tr }
		return attr_trans.DEFAULT
	}

	const transform_attributes = (attrs, orig={}) =>
		Object
			.entries(attrs)
			.reduce(transform_attribute, orig)

	const transform_attribute = (acc, [ prop, val ]) => {
		const attr_tr = attribute_transformer(prop)

		if (attr_tr.validate && !attr_tr.validate(val))
			return acc

		if (attr_tr.trans) {
			const transed = attr_tr.trans[val]

			if (transed)
				return transform_attributes(transed, acc)

			return acc
		}
		return add_attribute(acc, prop, val)
	}

	const add_attribute = (attrs, attr, attrVal) => {
		const attr_tr = attribute_transformer(attr)
		return {
			...attrs,
			[attr]: attr_tr.add(
				attrs[attr],
				attr_tr.parse(attrVal)
			)
		}
	}


	const css_tokens = instanceOptions.css.tokens || {}
	const css_transformations = instanceOptions.css.transformations.properties || {}
	const css_syntax = {
		PROP: 'property',
		PROPNAME: 'propertyname',
		PROPVAL: 'propertyvalue',
		VALUE: 'value',
		UNIT: 'unit',
		BRACE: 'bracket'
	}
	// TODO: enforce no unit on b for a/b
	// TODO: enforce no unit on a or b for a*b
	const css_actions = {
		value(scope, value, calced = false) {
			let out = ''

			const isCalc = !calced && value.some(v => v.operator)
			if (isCalc)
				out += 'calc('

			out += value
				.map((p, i, l) => {
					if (typeof p === 'string')
						return p

					const prev = l[i-1]
					if (Array.isArray(p))
						return `${(prev && prev.operator)?' ':''}(${css_actions.value(scope, p, calced || isCalc)})`

					if (p.operator)
						return ' '+p.operator

					return `${i===0?'':' '}${p.value}${p.unit||'px'}`
				}).join('')

			if (isCalc)
				out += ')'

			return out
		},
		done(scope, prop) {
			if (prop.value) {
				scope.writer.write(prop.name, css_actions.value(scope, prop.value))
			} else
			if (css_transformations[prop.name]) {
				Object.entries(css_transformations[prop.name])
					.forEach(pv => {
						scope.writer.write(...pv)
					});
			}
		}
	}

	const css_parser = parser([
		{
			reading: 'END',
			action(scope) {
				if (scope.is_reading(this.syntax.PROPNAME)) {
					const prop = scope.get_reading_data(this.syntax.PROP)
					scope.stop_reading(this.syntax.PROP, true)
					prop.name = scope.buffer
					css_actions.done(scope, prop)
				} else
				if (scope.is_reading(this.syntax.PROPVAL)) {
					const prop = scope.get_reading_data(this.syntax.PROP)
					scope.stop_reading(this.syntax.PROP, true)
					const read = scope.buffer
					if (read)
						prop.value.push(read)
					css_actions.done(scope, prop)
				} else
				if (scope.is_reading(this.syntax.VALUE)) {
					const val = scope.get_reading_data(this.syntax.VALUE)
					const prop = scope.get_reading_data(this.syntax.PROP)
					val.value = scope.buffer
					scope.stop_reading(this.syntax.PROP, true)
					prop.value.push(val)
					css_actions.done(scope, prop)
				} else
				if (scope.is_reading(this.syntax.UNIT)) {
					const val = scope.get_reading_data(this.syntax.VALUE)
					const prop = scope.get_reading_data(this.syntax.PROP)
					val.unit = scope.buffer
					scope.stop_reading(this.syntax.PROP, true)
					prop.value.push(val)
					css_actions.done(scope, prop)
				}
			}
		},
		{
			reading: "PROPNAME",
			string: [css_tokens.assign],
			action(scope) {
				const prop = scope.get_reading_data(this.syntax.PROP)
				prop.name = scope.buffer
				prop.value = []
				scope.stop_reading(this.syntax.PROPNAME)
				scope.start_reading(this.syntax.PROPVAL)
			}
		},
		{
			reading: "PROPNAME",
			string: [css_tokens.terminate],
			action(scope) {
				const prop = scope.get_reading_data(this.syntax.PROP)
				scope.stop_reading(this.syntax.PROP, true)
				prop.name = scope.buffer
				css_actions.done(scope, prop)
			}
		},
		{
			reading: "PROPVAL",
			string: [css_tokens.terminate],
			action(scope) {
				const prop = scope.get_reading_data(this.syntax.PROP)
				scope.stop_reading(this.syntax.PROP, true)
				const read = scope.buffer
				if (read)
					prop.value.push(read)
				css_actions.done(scope, prop)
			}
		},
		{
			reading: "BRACE",
			string: [css_tokens.terminate],
			action(scope) {
				throw new Error('Unclosed bracket')
			}
		},
		{
			reading: "PROPVAL",
			string: [css_tokens.openbrace],
			action(scope) {
				const prop = scope.get_reading_data(this.syntax.PROP)
				const read = scope.buffer
				if (read)
					prop.value.push(read)
				scope.start_reading(this.syntax.BRACE, {value:[]})
			}
		},
		{
			reading: "VALUE",
			string: [css_tokens.closebrace],
			condition(scope) {
				return scope.is_reading(this.syntax.BRACE, true)
			},
			action(scope) {
				const val = scope.get_reading_data(this.syntax.VALUE)
				const prop = scope.get_reading_data(this.syntax.BRACE)
				val.value = scope.buffer
				prop.value.push(val)
				scope.stop_reading(this.syntax.BRACE, true)
				const par_prop = scope.get_reading_data([this.syntax.PROP, this.syntax.BRACE])

				par_prop.value.push(prop.value)
			}
		},
		{
			reading: "UNIT",
			string: [css_tokens.closebrace],
			action(scope) {
				const val = scope.get_reading_data(this.syntax.VALUE)
				const prop = scope.get_reading_data(this.syntax.BRACE)
				val.unit = scope.buffer
				prop.value.push(val)
				scope.stop_reading(this.syntax.BRACE, true)
				const par_prop = scope.get_reading_data([this.syntax.PROP, this.syntax.BRACE])

				par_prop.value.push(prop.value)
			}
		},
		{
			reading: "BRACE",
			string: [css_tokens.closebrace],
			action(scope) {
				scope.stop_reading(this.syntax.BRACE, true)
			}
		},
		{
			reading: "VALUE",
			string: [css_tokens.terminate],
			action(scope) {
				const val = scope.get_reading_data(this.syntax.VALUE)
				const prop = scope.get_reading_data(this.syntax.PROP)
				val.value = scope.buffer
				scope.stop_reading(this.syntax.PROP, true)
				prop.value.push(val)
				css_actions.done(scope, prop)
			}
		},
		{
			reading: "UNIT",
			string: [css_tokens.terminate],
			action(scope) {
				const val = scope.get_reading_data(this.syntax.VALUE)
				const prop = scope.get_reading_data(this.syntax.PROP)
				val.unit = scope.buffer
				scope.stop_reading(this.syntax.PROP, true)
				prop.value.push(val)
				css_actions.done(scope, prop)
			}
		},
		{
			reading: "VALUE",
			string: [css_tokens.numeric],
			action(scope) {
				return {buffer:scope.currentCharacter}
			}
		},
		{
			reading: "VALUE",
			string: [css_tokens.operators],
			action(scope) {
				const prop = scope.get_reading_data([this.syntax.PROP, this.syntax.BRACE])
				const val = scope.get_reading_data(this.syntax.VALUE)
				val.value = scope.buffer
				prop.value.push(val)
				prop.value.push({operator:scope.currentCharacter})
				scope.stop_reading(this.syntax.VALUE)
			}
		},
		{
			reading: "PROPVAL",
			string: [css_tokens.operators],
			action(scope) {
				const prop = scope.get_reading_data(this.syntax.PROP)
				prop.value.push({operator:scope.currentCharacter})
			}
		},
		{
			reading: "UNIT",
			string: [css_tokens.operators],
			action(scope) {
				const prop = scope.get_reading_data([this.syntax.PROP, this.syntax.BRACE])
				const val = scope.get_reading_data(this.syntax.VALUE)
				val.unit = scope.buffer
				prop.value.push(val)
				prop.value.push({operator:scope.currentCharacter})
				scope.stop_reading(this.syntax.UNIT)
				scope.stop_reading(this.syntax.VALUE)
				// scope.start_reading(this.syntax.VALUE, {value:'',unit:false})
			}
		},
		{
			reading: "UNIT",
			string: [css_tokens.whitespace],
			action(scope) {}
		},
		{
			reading: "UNIT",
			action(scope) {
				return {buffer:scope.currentCharacter}
			}
		},
		{
			reading: "VALUE",
			string: [css_tokens.whitespace],
			action(scope) {
				const prop = scope.get_reading_data([this.syntax.PROP, this.syntax.BRACE])
				const val = scope.get_reading_data(this.syntax.VALUE)
				val.value = scope.buffer
				prop.value.push(val)
				scope.stop_reading(this.syntax.VALUE)
			}
		},
		{
			reading: "VALUE",
			action(scope) {
				const val = scope.get_reading_data(this.syntax.VALUE)
				val.value = scope.buffer
				scope.start_reading(this.syntax.UNIT)
				return {buffer:scope.currentCharacter}
			}
		},
		{
			reading: ["PROPVAL", "BRACE"],
			string: [css_tokens.numeric],
			action(scope) {
				scope.start_reading(this.syntax.VALUE, {value:'',unit:false})
				return {buffer:scope.currentCharacter}
			}
		},
		{
			string: [css_tokens.whitespace],
			action(scope) {}
		},
		{
			reading: "PROPNAME",
			action(scope) {
				return {buffer:scope.currentCharacter}
			}
		},
		{
			reading: ["PROPVAL", "BRACE"],
			action(scope) {
				return {buffer:scope.currentCharacter}
			}
		},
		{
			string: [css_tokens.terminate],
			action(scope) {
				return {buffer:''}
			}
		},
		{
			not_reading: 'START',
			action(scope) {
				scope.start_reading(this.syntax.PROP, {})
				scope.start_reading(this.syntax.PROPNAME)
				return {buffer:scope.currentCharacter}
			}
		}
	], {
			object: {
				inst: () => ({}),
				dumpString: inst => Object.entries(inst).map(([p,v]) => `${p}:${v};`).join(''),
				dump: inst => inst,
				write: (inst, prop, val) => ({
					...inst,
					[prop]: val
				})
			},
			default: {
				inst: () => '',
				dump: inst => inst,
				write: (inst, prop, val) => inst+`${prop}:${val};`
			},
		},
		css_syntax,
		css_tokens,
	)




	const actions = {
		inline_expression(tag) {
			return tag.attrs.id+((tag.attrs.class && tag.attrs.class.length) ? ('.'+tag.attrs.class.join('.')) : '')
		},
		open_tag(scope, tag, passthrough) {
			const conditional = scope.currentCondition
			if (conditional === false) {
				if (string_is(tag.name, tag_groups.var)) {
					scope.stop_reading(syntax.TAG)
					if (tag.indent !== undefined) {
						scope.start_reading(syntax.INDENT)
						return { setBuffer: string_repeat(' ', tag.indent) }
					}
				}
				return { setBuffer: '' }
			}
			let buff = false

			const custom = custom_components[tag.name]
			if (custom) {
				const contents = custom.template
				const defs = new custom.defaults()
				Object.assign(defs, tag.attrs)

				scope.writer.nest(
					contents,
					defs,
					{ ...passthrough, debug: passthrough.debug(0) })

				scope.stop_reading(syntax.TAG)
				scope.setCondition(tag.indent, tag.eval)
				return { setBuffer: '' }
			} else
			{

			if (string_is(tag.name, tag_groups.system)) {
				if (string_is(tag.name, tag_groups.else) && scope.condition(tag.indent, true)) {
					tag.eval = false
				} else
				if (tag.name === tags.ELSE) {
					tag.eval = true
				} else
				if (tag.name === tags.FOR) {
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
				// {
				if (tag.name === tags.VAR) {
					let result
					if (tag.attrs.fun) {
						const prepared_func = scope.prep(tag.attrs.fun)
						result = function (...args) {
							let namedArgs = {}
							if (tag.attrs.args) {
								namedArgs = Object.fromEntries(
									tag.attrs.args.split(' ')
									.map((name, i) => [name,args[i]])
								)
							}
							return prepared_func({ this: this, event, arguments, ...namedArgs })
						}
					} else {
						let exp = false
						if (tag.attrs.exp)
							exp = tag.attrs.exp
						else
						if (tag.attrs.id)
							exp = this.inline_expression(tag)
						result = exp ? scope.exec(exp) : scope.props
					}


					scope.stop_reading(syntax.TAG)
					// reading attr value? send to buffer
					scope.buffer = result//.toString()
					buff = true
					if (scope.is_reading(syntax.ATTRVAL, true)) {
					} else
					// reading tag content? assume attrname
					if (scope.is_reading(syntax.TAGCONTENT)) {
						scope.start_reading(syntax.ATTR)
						scope.start_reading(syntax.ATTRNAME)
					} else
					// Reading nothing? start reading content
					{
						if (!scope.is_reading(syntax.CONTENT))
							scope.start_reading(syntax.CONTENT)
					}
				} else
				if (tag.name === tags.FUNC) {
					let exp = false
					if (tag.attrs.fun)
						exp = tag.attrs.fun
					else
					if (tag.attrs.exp)
						exp = tag.attrs.exp
					else
					if (tag.attrs.id)
						exp = this.inline_expression(tag)

					const prepared_func = scope.prep(exp)
					const result = function (...arguments) {
						let namedArgs = {}
						if (tag.attrs.args) {
							namedArgs = Object.fromEntries(
								tag.attrs.args.split(' ')
								.map((name, i) => [name,arguments[i]])
							)
						}
						return prepared_func({ this: this, event, arguments, ...namedArgs })
					}

					scope.stop_reading(syntax.TAG)
					// reading attr value? send to buffer
					scope.buffer = result//.toString()
					buff = true
					if (scope.is_reading(syntax.ATTRVAL, true)) {
					} else
					// reading tag content? assume attrname
					if (scope.is_reading(syntax.TAGCONTENT)) {
						scope.start_reading(syntax.ATTR)
						scope.start_reading(syntax.ATTRNAME)
					} else
					// Reading nothing? start reading content
					{
						if (!scope.is_reading(syntax.CONTENT))
							scope.start_reading(syntax.CONTENT)
					}
				} else
				if (tag.name === tags.ARGS) {
					if (scope.is_reading(syntax.TAGCONTENT, true)) {
						const exp = tag.attrs.exp
							? tag.attrs.exp
							: (tag.attrs.id
									? this.inline_expression(tag)
									: false)
						const result = exp ? scope.exec(exp) : scope.props
						if (typeof result === 'object') {
							const par_tag = scope.reading[scope.reading.findIndex(({ type }) => type === syntax.TAGCONTENT)+1].data
							par_tag.attrs = {
								...par_tag.attrs,
								...result
							}
						}
					}
				} else // condition
				{
					const exp = tag.attrs.exp
						? tag.attrs.exp
						: (tag.attrs.id
								? this.inline_expression(tag)
								: 'undefined')
					const result = scope.exec(exp)
					tag.eval = Boolean(result)
				}
			}
			if (conditional !== false && scope.currentCondition !== false && !string_is(tag.name, tag_groups.system)) {
				const selfClosing = tag.selfClosing || self_closing_tags[tag.name] || false
				const attrs = transform_attributes(tag.attrs)
				scope.writer.open({
					name: tag.name,
					indent: tag.indent,
					selfClosing,
					attrs: Object
						.entries(attrs)
						.map(([ prop, val ]) => [ prop, attribute_transformer(prop).write.call(instance_object, val) ])
				})
				if (selfClosing)
					scope.stop_reading(syntax.TAG, true)
			}
			if (string_is(tag.name, tag_groups.condition) || scope.condition(tag.indent, true) !== undefined) {
				scope.setCondition(tag.indent, tag.eval)
			}

			}
			if (!buff)
				return { setBuffer: '' }
		},
		close_tags(scope, min_indent) {
			const siblings_and_nephews = scope.get_all_reading_data(syntax.TAG, ({ indent }) => indent < min_indent)
			siblings_and_nephews
				.forEach(tag => {
					const { indent, name } = tag
					const print_close = name &&
						scope.condition(indent) !== false &&
						!string_is(name, tag_groups.system)

					scope.stop_reading(syntax.TAG, true)
					if (print_close && scope.currentCondition !== false)
						scope.writer.close({
							name: tag.name,
							indent: tag.indent,
						})
				})
		},
		render_loop(scope, loop, passthrough) {
			const contents = scope.buffer+scope.currentCharacter
			if (scope.currentCondition !== false)
				loop.items.map(([ key, val ]) =>
					scope.writer.nest(
						contents,
						nest_props(scope.props, {
							[loop.varname]: val,
							...(loop.keyname ? {[loop.keyname]: key } : {})
						}),
						{ ...passthrough }))
			scope.buffer = string_repeat(' ', loop.indent)
			scope.stop_reading(syntax.LOOP)
			scope.start_reading(syntax.INDENT)
		}
	}

	const eventAttrs = [
		'onabort',
		'onafterprint',
		'onbeforeprint',
		'onbeforeunload',
		'onblur',
		'oncanplay',
		'oncanplaythrough',
		'onchange',
		'onclick',
		'oncopy',
		'oncuechange',
		'oncut',
		'ondblclick',
		'ondurationchange',
		'onemptied',
		'onended',
		'onerror',
		'onerror',
		'onfocus',
		'onhashchange',
		'oninput',
		'oninvalid',
		'onkeydown',
		'onkeypress',
		'onkeyup',
		'onload',
		'onloadeddata',
		'onloadedmetadata',
		'onloadstart',
		'onmessage',
		'onmousedown',
		'onmousemove',
		'onmouseout',
		'onmouseover',
		'onmouseup',
		'onmousewheel',
		'onoffline',
		'ononline',
		'onpagehide',
		'onpageshow',
		'onpaste',
		'onpause',
		'onplay',
		'onplaying',
		'onpopstate',
		'onprogress',
		'onratechange',
		'onreset',
		'onresize',
		'onsearch',
		'onseeked',
		'onseeking',
		'onselect',
		'onstalled',
		'onstorage',
		'onsubmit',
		'onsuspend',
		'ontimeupdate',
		'onunload',
		'onvolumechange',
		'onwaiting',
		'onwheel',
	]

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
		FUNC: 'func',
		ARGS: 'args',
		ELSE: 'else',
		ELSEIF: 'elseif',
		FOR: 'for'
	}

	const tag_groups = {
		system: [tags.VAR,tags.FOR,tags.IF,tags.ELSE,tags.ELSEIF,tags.ARGS,tags.FUNC],
		condition: [tags.IF,tags.ELSE,tags.ELSEIF],
		else: [tags.ELSE,tags.ELSEIF],
		if: [tags.IF,tags.ELSEIF],
		var: [tags.VAR,tags.FUNC],
	}

	const self_closing_tags = {
		area: true,
		base: true,
		br: true,
		col: true,
		command: true,
		embed: true,
		hr: true,
		img: true,
		input: true,
		keygen: true,
		link: true,
		menuitem: true,
		meta: true,
		param: true,
		source: true,
		track: true,
		wbr: true
	}


	const writers = (() => {
		const string_writer = {
			inst: () => '',
			dump: inst => inst,
			open: (inst, tag) => {
				const [events, others] = array_partition(tag.attrs,
					([prop, val]) => eventAttrs.includes(prop) && typeof val === 'function')
				window.__htma__string_writer__event_callbacks = window.__htma__string_writer__event_callbacks || {id:0}

				const mappedEvents = events.map(([prop, val]) => {
					window.__htma__string_writer__event_callbacks.id++
					window.__htma__string_writer__event_callbacks[window.__htma__string_writer__event_callbacks.id] = val
					return [prop, window.__htma__string_writer__event_callbacks.id]
				})

				const attrs = (others
					.map(([prop, val]) =>
						`${prop}="${encodeEntities(val)}"`))
					.concat(mappedEvents
						.map(([prop, id]) =>
							`${prop}="window.__htma__string_writer__event_callbacks[${id}].call(this)"`))

				return inst + `<${tag.name}${attrs.length ? ` ${attrs.join(' ')}` : ''}${tag.selfClosing ? '/' : ''}>`
			},
			close: (inst, tag) =>
				inst + `</${tag.name}>`,
			content: (inst, content) =>
				inst + content,
			nest: (inst, contents, arguments, options) =>
				inst + parse(
					contents,
					arguments,
					options
				)
		}

		const dom_writer = {
			inst: () => ({
				tracker: [{ element: document.createElement('htma-container'), indent: -1 }],
				get lastAncestor() {
					return this.tracker[0].element
				},
				get firstAncestor() {
					return this.tracker[this.tracker.length-1].element
				},
			}),
			dump: inst =>
				inst.firstAncestor.childNodes,
			dumpString: inst =>
				inst.firstAncestor.innerHTML,
			open: (inst, tag) => {
				const newEl = document.createElement(tag.name)
				tag.attrs
					.forEach(([ prop, val ]) => {
						if (eventAttrs.includes(prop) && typeof val === 'function')
							newEl.addEventListener(prop.slice(2), val)
						else
							newEl.setAttribute(prop, val)
					})
				if (!tag.selfClosing)
					inst.tracker.unshift({ indent: tag.indent, element: newEl })
				const ancestor = inst.tracker.find(({ indent }) => indent < tag.indent).element
				ancestor.appendChild(newEl)
			},
			close: (inst, tag) => {
				inst.tracker.shift()
			},
			content: (inst, content) => {
				const ancestor = inst.lastAncestor
				const newEl = document.createTextNode(content)
				ancestor.appendChild(newEl)
			},
			nest: (inst, contents, arguments, options) => {
				const ancestor = inst.lastAncestor

				const els = parse(
					contents,
					arguments,
					{ ...options, outputString: false }
				)
				ancestor.append(...els)
			}
		}

		const object_writer = {
			inst: () => ({
				tracker: [{ element: {children:[]}, indent: -1 }],
				get lastAncestor() {
					return this.tracker[0].element
				},
				get firstAncestor() {
					return this.tracker[this.tracker.length-1].element
				},
			}),
			dump: inst =>
				inst.firstAncestor.children,
			dumpString: inst => {
				const dumpEl = element => {
					if (typeof element === 'string') return encodeEntities(element)
					const { name, attributes, children, selfClosing } = element
					return '<'
						+ name
						+ Object.entries(attributes).map(([p,v]) => ` ${p}="${encodeEntities(v)}"`).join('')
						+ (selfClosing
							? '/>'
							: `>${children.map(dumpEl).join('')}</${name}>`)
				}
				return inst.firstAncestor.children.map(dumpEl).join('')
			},
			open: (inst, tag) => {
				const newEl = {
					name: tag.name,
					attributes: Object.fromEntries(tag.attrs),
					children: [],
					selfClosing: tag.selfClosing
				}
				if (!tag.selfClosing)
					inst.tracker.unshift({ indent: tag.indent, element: newEl })
				const ancestor = inst.tracker.find(({ indent }) => indent < tag.indent).element
				ancestor.children.push(newEl)
			},
			close: (inst, tag) => {
				inst.tracker.shift()
			},
			content: (inst, content) => {
				const ancestor = inst.lastAncestor
				ancestor.children.push(content.toString())
			},
			nest: (inst, contents, arguments, options) => {
				const ancestor = inst.lastAncestor

				const els = parse(
					contents,
					arguments,
					{ ...options, outputString: false }
				)
				ancestor.children = ancestor.children.concat(els)
			}
		}

		return {
			default: string_writer,
			object: object_writer,
			string: string_writer,
			dom: dom_writer
		}
	})()

	if (instanceOptions.defaultWriter)
		writers.default = instanceOptions.defaultWriter


	const commonAttributeAliases = invertAliasIndex(
		(instanceOptions.aliases && instanceOptions.aliases.attributes) || {})
	const tagAliases = invertAliasIndex(
		(instanceOptions.aliases && instanceOptions.aliases.tags) || {})
	const tagAttributeAliases =
		Object.fromEntries(
			Object
				.entries((instanceOptions.aliases && instanceOptions.aliases.tagAttributes) || {})
				.map(([ k, v ]) => [ k, invertAliasIndex(v) ])
		)

	const string_groups = instanceOptions.tokens || {}


	const conditions = [
		{
			reading: "START",
			action(scope) {
				scope.start_reading(this.syntax.INDENT)
			}
		},
		{
			reading: "END",
			action(scope) {
				// Write any remaining content
				if (scope.is_reading(this.syntax.CONTENT)) {
					if (scope.currentCondition !== false)
						scope.writer.content(scope.buffer)
					scope.stop_reading(this.syntax.CONTENT)
				}
				// Close all remaining tags
				actions.close_tags(scope, 0)
			}
		},
		{
			reading: "LOOP",
			action(scope, { debug, ...passthrough }) {
				const tag = scope.get_reading_data(this.syntax.TAG)
				const loop = scope.reading_data
				if (string_is(scope.currentCharacter, string_groups.newline)) {
					loop.indent = 0
				} else
				if (string_is(scope.currentCharacter, string_groups.indent)) {
					loop.indent += 1
				}
				if (!scope.followingCharacter || (!string_is(scope.followingCharacter, string_groups.indent, string_groups.newline) && loop.indent <= tag.indent)) {
					actions.render_loop(scope, loop, { ...passthrough, debug: debug(loop.index) })
				} else {
					return { buffer: scope.currentCharacter }
				}
			}
		},
		{
			reading: "TAGNAME",
			string: [string_groups.indent, string_groups.newline, string_groups.idmarker, string_groups.classseparator, string_groups.closetag],
			action(scope, passthrough) {
				const tag = scope.get_reading_data(this.syntax.TAG)
				const tagName = scope.buffer
				const canonName = tagAliases[tagName] || tagName
				const finalName = custom_components[canonName] ? canonName : canonName.toLowerCase()
				tag.name = tagAliases[tagName] || tagName
				scope.stop_reading(this.syntax.TAGNAME)
				if (!string_is(tag.name, tag_groups.else) && scope.condition(tag.indent, true) !== undefined) {
					// console.log(tag, tag.eval)
					scope.setCondition(tag.indent, undefined)
				}

				if (string_is(scope.currentCharacter, string_groups.closetag)) {
					return actions.open_tag(scope, tag, passthrough)
				} else
				if (string_is(scope.currentCharacter, string_groups.idmarker)) {
					scope.start_reading(this.syntax.ID)
				} else
				if (string_is(scope.currentCharacter, string_groups.classseparator)) {
					scope.start_reading(this.syntax.CLASS)
				} else
				if (string_is(scope.currentCharacter, string_groups.indent, string_groups.newline)) {
					scope.start_reading(this.syntax.TAGCONTENT)
					if (string_is(scope.currentCharacter, string_groups.newline)) {
						scope.start_reading(this.syntax.INDENT)
					}
				}
			}
		},
		{
			condition(scope) {
				return scope.is_reading(this.syntax.TAGCONTENT, true) && scope.is_reading(this.syntax.ATTRNAME)
			},
			string: [string_groups.indent, string_groups.newline, string_groups.closetag, string_groups.attrassign],
			action(scope, passthrough) {

				const tag = scope.reading[scope.reading.findIndex(({ type }) => type === this.syntax.TAGCONTENT)+1].data

				const attributeAliases = tagAttributeAliases[tag.name] || {}
				const attrName = scope.buffer.toLowerCase()
				tag.current_attr = attributeAliases[attrName] || commonAttributeAliases[attrName] || attrName
				scope.stop_reading(this.syntax.ATTRNAME)

				if (string_is(scope.currentCharacter, string_groups.closetag)) {
					scope.stop_reading(this.syntax.ATTR)
					scope.stop_reading(this.syntax.TAGCONTENT, true)
					if (scope.currentCondition)
						tag.attrs[tag.current_attr] = true
					return actions.open_tag(scope, tag, passthrough)
				} else
				if (string_is(scope.currentCharacter, string_groups.attrassign)) {
					scope.start_reading(this.syntax.ATTRVAL, {value:''})
				} else
				if (string_is(scope.currentCharacter, string_groups.indent, string_groups.newline)) {
					if (scope.currentCondition)
						tag.attrs[tag.current_attr] = true
					scope.stop_reading(this.syntax.ATTR)
					if (string_is(scope.currentCharacter, string_groups.newline)) {
						scope.start_reading(this.syntax.INDENT)
					}
				}
			}
		},
		{
			reading: "ATTRVAL",
			string: [string_groups.indent, string_groups.newline, string_groups.closetag],
			action(scope, passthrough) {
				const attributeCondition = scope.currentCondition
				const prevVal = scope.get_reading_data(this.syntax.ATTRVAL).value
				const curVal = scope.buffer
				const attrVal = prevVal ? (prevVal + curVal) : curVal

				scope.stop_reading(this.syntax.ATTRVAL)
				scope.stop_reading(this.syntax.ATTR)
				const tag = scope.reading[scope.reading.findIndex(({ type }) => type === this.syntax.TAGCONTENT)+1].data

				if (attributeCondition)
					tag.attrs = add_attribute(tag.attrs, tag.current_attr, attrVal)

				if (string_is(scope.currentCharacter, string_groups.closetag)) {
					scope.stop_reading(this.syntax.TAGCONTENT)
					return actions.open_tag(scope, tag, passthrough)
				} else
				if (string_is(scope.currentCharacter, string_groups.newline)) {
					scope.start_reading(this.syntax.INDENT)
				}
				return { setBuffer: '' }
			}
		},
		{
			condition(scope) {
				return scope.is_reading(this.syntax.ID) || scope.is_reading(this.syntax.CLASS)
			},
			string: [string_groups.indent, string_groups.newline, string_groups.classseparator, string_groups.closetag],
			action (scope, passthrough) {
				const tag = scope.get_reading_data(this.syntax.TAG)
				if (scope.is_reading(this.syntax.ID)) {
					tag.attrs.id = scope.buffer
					scope.stop_reading(this.syntax.ID)
				} else
				if (scope.is_reading(this.syntax.CLASS)) {
					tag.attrs = add_attribute(tag.attrs, 'class', scope.buffer)
					scope.stop_reading(this.syntax.CLASS)
				}

				if (string_is(scope.currentCharacter, string_groups.closetag)) {
					return actions.open_tag(scope, tag, passthrough)
				} else
				if (string_is(scope.currentCharacter, string_groups.classseparator)) {
					scope.start_reading(this.syntax.CLASS)
				} else
				if (string_is(scope.currentCharacter, string_groups.indent, string_groups.newline)) {
					scope.start_reading(this.syntax.TAGCONTENT)
					if (string_is(scope.currentCharacter, string_groups.newline)) {
						scope.start_reading(this.syntax.INDENT)
					}
				}
			},
		},
		{
			condition(scope) {
				return scope.is_reading(this.syntax.STRING, true) && scope.is_reading(this.syntax.ESCAPE)
			},
			action(scope){
				scope.stop_reading(this.syntax.ESCAPE)
				return { buffer: '\\'+scope.currentCharacter }
			}
		},
		{
			condition(scope, s) {
				return scope.is_reading(this.syntax.STRING) && !scope.is_reading(this.syntax.ESCAPE) && string_is(s, string_groups.escape)
			},
			action(scope){
				scope.start_reading(this.syntax.ESCAPE)
			}
		},
		{
			condition(scope, s) {
				return array_sliceAt(scope.reading,
							({ type }) => type === this.syntax.STRING)
						.every	(({ type }) => type !== this.syntax.ATTRVAL) &&

				// scope.is_reading(this.syntax.STRING, true) &&
					!scope.is_reading(this.syntax.ESCAPE) &&
					s === scope.get_reading_data(this.syntax.STRING).open
			},
			action(scope){
				scope.stop_reading(this.syntax.STRING, true)
			}
		},
		{
			string: [string_groups.opentag],
			action(scope) {
				const child_tag = {attrs:{}}
				if (scope.is_reading(this.syntax.ATTRVAL, true)) {
					scope.get_reading_data(this.syntax.ATTRVAL).value = scope.buffer
				} else
				if (scope.is_reading(this.syntax.INDENT)) {
					child_tag.indent = scope.buffer.length
					scope.stop_reading(this.syntax.INDENT)
					actions.close_tags(scope, child_tag.indent)
				} else
				if (scope.is_reading(this.syntax.TAGCONTENT)) {
				} else
				if (scope.is_reading(this.syntax.CONTENT)) {
					if (scope.currentCondition !== false)
						scope.writer.content(scope.buffer)
				}
				scope.start_reading(this.syntax.TAG, child_tag)
				scope.start_reading(this.syntax.TAGNAME)
			}
		},
		{
			reading: "STRING",
			action(scope) {
				return {buffer:scope.currentCharacter}
			}
		},
		{
			string: [string_groups.selfclose],
			condition(scope) {
				return !scope.is_reading(this.syntax.STRING) && scope.is_reading(this.syntax.TAG, true) && string_is(scope.followingCharacter, string_groups.closetag)
			},
			action(scope) {
				const tag = scope.get_reading_data(this.syntax.TAG)
				tag.selfClosing = true
			}
		},
		{
			reading: "ATTRVAL",
			string: [string_groups.quote],
			condition (scope) {
				const existing_buffer = scope.buffer
				scope.buffer = existing_buffer
				return !existing_buffer
			},
			action(scope){
				scope.start_reading(this.syntax.STRING, { open: scope.currentCharacter })
			}
		},
		{
			condition(scope) {
				return scope.is_reading(this.syntax.TAGCONTENT, true)
			},
			string: [string_groups.closetag],
			action(scope, passthrough) {
				const tag = scope.reading[scope.reading.findIndex(({ type }) => type === this.syntax.TAGCONTENT)+1].data

				scope.stop_reading(this.syntax.TAGCONTENT, true)

				return actions.open_tag(scope, tag, passthrough)
			}
		},
		{
			string: [string_groups.newline],
			action (scope) {
				if (scope.is_reading(this.syntax.CONTENT)) {
					if (scope.currentCondition !== false)
						scope.writer.content(scope.buffer)
					scope.stop_reading(this.syntax.CONTENT)
					scope.start_reading(this.syntax.INDENT)
				} else
				if (scope.is_reading(this.syntax.INDENT)) {
				} else
				{
					if (scope.currentCondition !== false)
						scope.writer.content(scope.buffer)
					scope.start_reading(this.syntax.INDENT)
				}
				return { setBuffer: '' }
			}
		},
		{
			condition(scope, s) {
				return scope.is_reading(this.syntax.TAGCONTENT, true)
						&& array_sliceAt(scope.reading,
									({ type }) => type === this.syntax.TAGCONTENT)
								.every	(({ type }) => !string_is(type, [this.syntax.ATTR, this.syntax.TAGNAME, this.syntax.ID, this.syntax.CLASS, 'tagvalue']))
						&& !string_is(s, string_groups.indent, string_groups.newline)
			},
			action(scope) {
				const attr_data = {}
				if (scope.is_reading(this.syntax.INDENT)) {
					attr_data.indent = scope.buffer.length
					scope.stop_reading(this.syntax.INDENT)
				}
				scope.start_reading(this.syntax.ATTR, attr_data)
				scope.start_reading(this.syntax.ATTRNAME)
				return { setBuffer: scope.currentCharacter }
			}
		},
		{
			reading: "INDENT",
			condition(scope, s) {
				return !string_is(s, string_groups.indent)
			},
			action(scope) {
				scope.stop_reading(this.syntax.INDENT)
				scope.start_reading(this.syntax.CONTENT, { indent: scope.buffer.length })
				return { setBuffer: scope.currentCharacter }
			}
		}
	]

	const parse = parser(conditions, writers, syntax, string_groups)

	const instance_object = {
		parse,
		parse_css: css_parser,
		writers,
		custom: (opts = {}) =>
			instance(mergeOptions(instanceOptions, opts)),
		add: add_component
	}

	return instance_object
}

return instance({
	css: {
		tokens: {
			assign: [':','='],
			terminate: [';'],
			whitespace: [' ','\t','\n'],
			numeric: ['.','1','2','3','4','5','6','7','8','9','0'],
			operators: ['-','+','/','*'],
			openbrace: ['('],
			closebrace: [')'],
		},
		transformations: {
			properties: {
				top: {top:'0'},
				bottom: {bottom:'0'},
				left: {left:'0'},
				right: {right:'0'},
				relative: {position:'relative'},
				absolute: {position:'absolute'},
				static: {position:'static'},
				fixed: {position:'fixed'},
				'border-box': {'box-sizing':'border-box'},
				'content-box': {'box-sizing':'content-box'},
				'padding-box': {'box-sizing':'padding-box'},
				width: {width:'100%'},
				height: {height:'100%'},
				ellipsis: {
					'text-overflow': 'ellipsis',
					overflow: 'hidden',
					'white-space': 'nowrap'
				},
				scroll: {overflow:'scroll'},
				scrollx: {'overflow-x':'scroll'},
				scrolly: {'overflow-y':'scroll'},
				/*
				"overflow":{
					"auto":		"css",
					"hidden":	"css",
					"visible":	"css",
				},
				*/
			}
		}
	},
	transformations: {
		attributes: {
			DEFAULT: {
				write: val => {
					if (val === true)
						return ''
					if (Array.isArray(val))
						return val.join(' ')
					if (typeof val === 'function')
						return val
					return val.toString()
				},
				add: (curr = '', str) => str,
				parse: str => str,
				validate: val => val && !(Array.isArray(val) && val.length === 0)
			},
			class: {
				write: classes =>
					classes
						.filter(filter_truthy)
						.filter(filter_unique)
						.join(' '),
				add: (currVal = [], newVal) => currVal.concat(newVal),
				parse: str => Array.isArray(str) ? str : str.toString().split(' '),
				validate: val => val.length
			},
			scroll: {
				trans: {
					auto: {style:{overflow:'auto'}},
					hidden: {style:{overflow:'hidden'}},
					visible: {style:{overflow:'visible'}},
					scroll: {style:{overflow:'scroll'}},
					x: {style:{'overflow-x':'scroll'}},
					y: {style:{'overflow-y':'scroll'}}
				}
			},
			style: {
				add: (curr = '', str) => {
					const currT = curr ? `${curr};` : curr
					if (Array.isArray(str))
						return currT+str.join(';')
					const type = typeof str
					if (type === 'string')
						return currT+str
					if (type === 'object')
						return currT+Object.entries(str).map(([prop,val]) =>
							prop.replace(/[A-Z]/gm, m =>
								'-' + m.toLowerCase()
							) + (val ? `:${val}` : '') + ';'
						).join('')
					return curr
				},
				write(str) {
					return this.parse_css(str, {}, { outputString: true })
				}
			}
		}
	},
	aliases: {
		tags: {
			elseif: ['elif'],
			for: ['foreach'],
			var: ['print'],
			args: ['attrs'],
			func: ['funct','fun','call','bind']
		},
		attributes: {
			accesskey: [],
			autocapitalize: [],
			class: [],
			contenteditable: [],
				enterkeyhint: [],
				inputmode: [],
			contextmenu: [],
			dir: [],
			draggable: [],
			hidden: [],
			id: [],
			itemprop: [],
			lang: [],
			slot: [],
			spellcheck: [],
			style: [],
			tabindex: [],
			title: [],
			translate: [],
		},
		tagAttributes: {
			if: {
				exp: ['expression','eval']
			},
			var: {
				exp: ['expression','eval'],
				fun: ['funct','function','bind']
			},
			func: {
				exp: ['expression','eval'],
				fun: ['funct','function','bind']
			},
			args: {
				exp: ['expression','eval']
			},
			else: {
				exp: ['expression','eval']
			},
			elseif: {
				exp: ['expression','eval']
			},
			for: {
				exp: ['expression','eval']
			},
			a: {
				download: [],
				href: ['h','src','url'],
				hreflang: [],
				media: [],
				ping: [],
				referrerpolicy: [],
				rel: [],
				shape: [],
				target: []
			},
			applet: {
				align: [],
				alt: [],
				code: [],
				codebase: []
			},
			area: {
				alt: [],
				coords: [],
				download: [],
				href: [],
				hreflang: [],
				media: [],
				ping: [],
				referrerpolicy: [],
				rel: [],
				shape: [],
				target: []
			},
			audio: {
				autoplay: [],
				buffered: [],
				controls: [],
				crossorigin: [],
				loop: [],
				muted: [],
				preload: [],
				src: []
			},
			base: {
				href: [],
				target: []
			},
			basefont: {
				color: []
			},
			bgsound: {
				loop: []
			},
			blockquote: {
				cite: []
			},
			body: {
				background: [],
				bgcolor: []
			},
			button: {
				autofocus: [],
				disabled: [],
				form: [],
				formaction: [],
				formenctype: [],
				formmethod: [],
				formnovalidate: [],
				formtarget: [],
				name: [],
				type: [],
				value: []
			},
			canvas: {
				height: ['h'],
				width: ['w']
			},
			caption: {
				align: []
			},
			col: {
				align: [],
				bgcolor: [],
				span: []
			},
			colgroup: {
				align: [],
				bgcolor: [],
				span: []
			},
			command: {
				checked: [],
				disabled: [],
				icon: [],
				radiogroup: [],
				type: []
			},
			data: {
				value: []
			},
			del: {
				cite: [],
				datetime: []
			},
			details: {
				open: []
			},
			dialog: {
				open: []
			},
			embed: {
				height: ['h'],
				src: [],
				type: [],
				width: ['w']
			},
			fieldset: {
				disabled: [],
				form: [],
				name: []
			},
			font: {
				color: []
			},
			form: {
				accept: [],
				"accept-charset": [],
				action: [],
				autocomplete: [],
				enctype: [],
				method: [],
				name: [],
				novalidate: [],
				target: []
			},
			hr: {
				align: [],
				color: []
			},
			html: {
				manifest: []
			},
			iframe: {
				align: [],
				allow: [],
				csp: [],
				height: ['h'],
				importance: [],
				loading: [],
				name: [],
				referrerpolicy: [],
				sandbox: [],
				src: [],
				srcdoc: [],
				width: ['w']
			},
			img: {
				align: [],
				alt: [],
				border: [],
				crossorigin: [],
				decoding: [],
				height: ['h'],
				importance: [],
				intrinsicsize: [],
				ismap: [],
				loading: [],
				referrerpolicy: [],
				sizes: [],
				src: [],
				srcset: [],
				usemap: [],
				width: ['w']
			},
			input: {
				accept: [],
				alt: [],
				autocomplete: [],
				autofocus: [],
				capture: [],
				checked: [],
				dirname: [],
				disabled: [],
				form: [],
				formaction: [],
				formenctype: [],
				formmethod: [],
				formnovalidate: [],
				formtarget: [],
				height: ['h'],
				list: [],
				max: [],
				maxlength: [],
				min: [],
				minlength: [],
				multiple: [],
				name: [],
				pattern: [],
				placeholder: [],
				readonly: [],
				required: [],
				size: [],
				src: [],
				step: [],
				type: [],
				usemap: [],
				value: [],
				width: ['w']
			},
			ins: {
				cite: [],
				datetime: []
			},
			keygen: {
				autofocus: [],
				challenge: [],
				disabled: [],
				form: [],
				keytype: [],
				name: []
			},
			label: {
				for: [],
				form: []
			},
			li: {
				value: []
			},
			link: {
				crossorigin: [],
				href: [],
				hreflang: [],
				importance: [],
				integrity: [],
				media: [],
				referrerpolicy: [],
				rel: [],
				sizes: [],
				type: []
			},
			map: {
				name: []
			},
			marquee: {
				bgcolor: [],
				loop: []
			},
			menu: {
				type: []
			},
			meta: {
				charset: [],
				content: [],
				"http-equiv": [],
				name: []
			},
			meter: {
				form: [],
				high: [],
				low: [],
				max: [],
				min: [],
				optimum: [],
				value: []
			},
			object: {
				border: [],
				data: [],
				form: [],
				height: ['h'],
				name: [],
				type: [],
				usemap: [],
				width: ['w']
			},
			ol: {
				reversed: [],
				start: []
			},
			output: {
				for: [],
				form: [],
				name: []
			},
			optgroup: {
				disabled: [],
				label: []
			},
			option: {
				disabled: [],
				label: [],
				selected: [],
				value: []
			},
			param: {
				name: [],
				value: []
			},
			progress: {
				form: [],
				max: [],
				value: []
			},
			q: {
				cite: []
			},
			script: {
				async: [],
				charset: [],
				crossorigin: [],
				defer: [],
				importance: [],
				integrity: [],
				language: [],
				referrerpolicy: [],
				src: [],
				type: []
			},
			select: {
				autocomplete: [],
				autofocus: [],
				disabled: [],
				form: [],
				multiple: [],
				name: [],
				required: [],
				size: []
			},
			source: {
				media: [],
				sizes: [],
				src: [],
				srcset: [],
				type: []
			},
			style: {
				media: [],
				scoped: [],
				type: []
			},
			table: {
				align: [],
				background: [],
				bgcolor: [],
				border: [],
				summary: []
			},
			tbody: {
				align: [],
				bgcolor: []
			},
			td: {
				align: [],
				background: [],
				bgcolor: [],
				colspan: [],
				headers: [],
				rowspan: []
			},
			textarea: {
				autocomplete: [],
				autofocus: [],
				cols: [],
				dirname: [],
				disabled: [],
				enterkeyhint: [],
				form: [],
				inputmode: [],
				maxlength: [],
				minlength: [],
				name: [],
				placeholder: [],
				readonly: [],
				required: [],
				rows: [],
				wrap: []
			},
			tfoot: {
				align: [],
				bgcolor: []
			},
			th: {
				align: [],
				background: [],
				bgcolor: [],
				colspan: [],
				headers: [],
				rowspan: [],
				scope: []
			},
			thead: {
				align: []
			},
			time: {
				datetime: []
			},
			tr: {
				align: [],
				bgcolor: []
			},
			track: {
				default: [],
				kind: [],
				label: [],
				src: [],
				srclang: []
			},
			video: {
				autoplay: [],
				buffered: [],
				controls: [],
				crossorigin: [],
				height: ['h'],
				loop: [],
				muted: [],
				poster: [],
				preload: [],
				src: [],
				width: ['w']
			},
		}
	},
	tokens: {
		indent: [' ', '\t'],
		newline: ['\n'],
		closetag: ['>'],
		opentag: ['<'],
		classseparator: ['.'],
		idmarker: ['#'],
		quote: ['"', "'"],
		attrassign: ['=', ':'],
		escape: ['\\'],
		selfclose: ['/'],
	}
})

})()
