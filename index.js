window.htma = (() => {
// Enclose everything in a scope to avoid any globals


// String & Array helpers
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


// Helper to encode HTML entities when writing content
const encodeEntities = (() => {
	// This list should be comprehensive, but may need maintenance
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

	// Encode single character
	const encodeEntity = (s = "") => {
		// If string entity exists, return that with dressing
		const ent = HTMLEntities[s]
		if (ent) return "&"+ent+";"

		// If outside of the ASCII range, use numeric entity
		const code = s.charCodeAt(0)
		if (code > 127)
			return "&#"+code.toString()+";"

		// Otherwise, return original character
		return s
	}

	// Encode entire string one character at a time
	const encodeEntities = (str = "") => [...str].map(encodeEntity).join('')

	return encodeEntities
})()


// Invert { canon: alias[] } to { alias: canon }
const invertAliasIndex = aliasIndex =>
	Object
		.entries(aliasIndex)
		.reduce((acc, [ canon, aliases ]) =>
			aliases
				.reduce((a, alias) =>
					({ ...a, [alias]: canon }), acc),
			{})


// Weird object inheritance
const nest_props = (parent, child) =>
	// Allow child to inherit from parent with both get & set
	new Proxy(parent, {
		get (target, prop) {
			// Check in child first
			if (prop in child)
				return child[prop]
			// Otherwise, check parent
			const got = target[prop]
			// Allow methods to keep their scope
			if (typeof got === 'function')
				return got.bind(target)
			return got
		},
		set (target, prop, val) {
			// Check in child first
			if (prop in child)
				child[prop] = val
			else // Otherwise, check parent
				target[prop] = val
			return true
		}
	})

const mergeOptions = (def, ovr) => {
	// Merge two instance options objects

	const ret = {}

	// Merge anything that exists in the default
	for (const k in def) {
		// Allow deletion by setting to null
		if (ovr[k] === null) continue
		// Merge sub-objects, but not arrays
		if (
			(typeof def[k] === 'object' && !Array.isArray(def[k])) ||
			(typeof ovr[k] === 'object' && !Array.isArray(ovr[k]))
		)
			ret[k] = mergeOptions(def[k], ovr[k] || {})
		// Use value and fall back to default
		else ret[k] = ovr[k] || def[k]
	}

	// Merge anything else that exists in the override
	for (const k in ovr) {
		// Allow deletion by setting to null
		if (ovr[k] === null) continue
		// If it's in def it's already been done above
		if (k in def) continue
		// Clone sub-objects, but not arrays
		if (typeof ovr[k] === 'object' && !Array.isArray(ovr[k]))
			ret[k] = mergeOptions({}, ovr[k])
		// Use value
		else ret[k] = ovr[k]
	}

	return ret
}


// Helper classes for parser
class Executor {
	// Containment class for executing arbitrary code in user-defined expressions

	// List of allowed keywords that are not interpreted as variable names
	#keyword_list = ['true','false','typeof','instanceof','Math','Object','Array','Boolean','String','console','undefined','null']
	// Keywords in a lookup table for quick access
	#keywords = {}
	#parser
	constructor(parse_js) {
		this.#parser = parse_js
		this.#keywords = Object.fromEntries(this.#keyword_list.map(kw => [kw,1]))
	}

	static evaluate_expression = (
		exp, internal_props,
		// Override globals to disallow access from inside the eval
		{ window, globals, global, document } = {}
	) => {
		// Wrapper for eval that returns the result of the expression
		let result
		try {
			result = Function('internal_props', `return (${exp})`)(internal_props)
		} catch (e) {
			console.error(e, exp, internal_props)
		}
		return result
	}

	rebase_vars (expression, newBase) {
		return this.#parser(expression)
	}

	exec (expression, internal_props) {
		// Execute an expression with the given scope variable
		return Executor.evaluate_expression(this.rebase_vars(expression, 'internal_props'), internal_props)
	}

	prep (expression, internal_props) {
		// Prepare a function to execute an expression with the given scope variable and any additional arguments
		const exp = this.rebase_vars(expression, 'internal_props')
		return args => Executor.evaluate_expression(exp, nest_props(internal_props, args))
	}
}

class Scope {
	#string = ''
	#writer = {}
	#writer_instance
	constructor (string = '', props = {}, writer = {}, parse_js) {
		this.#string = string
		this.#props = props
		this.#executor = new Executor(parse_js)

		const dump_fun = method => (...args) => method(this.#writer_instance, ...args)
		const mod_fun = method => (...args) => {
			const result = method(this.#writer_instance, ...args)
			if (typeof result !== 'undefined')
				this.#writer_instance = result
		}
		this.#writer_instance = writer.inst()
		this.#writer = Object.fromEntries(
			Object.entries(writer)
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

	#props = {}
	get props() {
		return this.#props
	}
	#executor
	exec(expression) {
		return this.#executor.exec(expression, this.#props)
	}
	prep(expression) {
		return this.#executor.prep(expression, this.#props)
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
			syntax: [...this.#reading],
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

}


// Custom component registry
const custom_components = {}

const add_component = (...args) => {
	// Add a custom component

	let name, str, o

	// If there's only one argument, assume it's a class
	if (args.length === 1){
		const obj = args[0]
		name = obj.name
		str = obj.template
		o = obj
	} else
	// Otherwise, assume it string based
	[name, str, o] = args

	// Normalise defaults as a class or getter function
	let defaults
	if (typeof o === 'function')
		defaults = o
	else
	if (typeof o === 'object')
		defaults = function () { return {...o} }
	else
		defaults = function () { return {} }

	// Register component
	custom_components[name] = {
		template: str,
		defaults
	}
}


// Parser definitions
const parser = (conditions = [], syntax_list = [], token_list = [], writer_interface = {}) => {
	// Define a parser for a particular language

	// SYNTAX VALUES
	// Syntax used by the system
	const system_syntax = ['START','END','DEFAULT']
	// Check all syntax values for validity
	syntax_list.forEach(syn => {
		if (system_syntax.includes(syn))
			throw new Error(`Invalid parser syntax value: "${syn}". This value is reserved by the system.`)
	})
	// Create a lookup table for the syntax values
	const syntax = Object.fromEntries(
		[].concat(
			syntax_list.map(syn => [ syn.toUpperCase(), `syntax_${syn.toLowerCase()}` ]),
			system_syntax.map(syn => [ syn.toUpperCase(), `syntax_system_${syn.toLowerCase()}` ])
		)
	)

	// TOKEN VALUES
	// Tokens used by the system
	const system_tokens = ['DEFAULT']
	// Check all token values for validity
	token_list.forEach(tok => {
		if (system_tokens.includes(tok))
			throw new Error(`Invalid parser token value: "${tok}". This value is reserved by the system.`)
	})
	// Create a lookup table for the token values
	const tokens = Object.fromEntries(
		[].concat(
			token_list.map(tok => [ tok.toUpperCase(), `token_${tok.toLowerCase()}` ]),
			system_tokens.map(tok => [ tok.toUpperCase(), `token_system_${tok.toLowerCase()}` ]),
		)
	)

	// Fallback action when no condition is met: append current character to buffer
	const defaultAction = scope => ({ buffer: scope.currentCharacter })

	// Normalise a syntax or token condition into an array
	const normalise_condition = (name, cond) => {
		const map = name.includes('syntax') ? syntax : tokens
		const evalled = (typeof cond === 'function') ? cond(map) : cond
		if (!evalled) return {}
		const arrayed = Array.isArray(evalled) ? evalled : [evalled]
		return {[name]:arrayed.map(v => map[v.toUpperCase()] || v.toLowerCase()).filter(filter_unique)}
	}

	// Normalise all the conditions to simplify the logic down the line
	const normalised_conditions = conditions.map(({ syntax, not_syntax, tokens, not_tokens, action, condition }) => ({
		action,
		...(condition ? {condition} : {}),
		...normalise_condition('syntax', syntax),
		...normalise_condition('not_syntax', not_syntax),
		...normalise_condition('tokens', tokens),
		...normalise_condition('not_tokens', not_tokens),
	}))

	// Create a lookup table for the conditions as { syntax: { token: condition[] } } for quick access
	const quick_conditions =
		Object.fromEntries(
			Object.values(syntax)
				.map(syn => {
					const syntax_conditions = normalised_conditions.filter(({ syntax: syntax_matches, not_syntax }) =>
						(!syntax_matches || syntax_matches.includes(syn)) &&
						(!not_syntax || !not_syntax.includes(syn))
					)
					return [
						syn,
						Object.fromEntries(
							Object.values(tokens)
							.map(token => [
								token,
								array_sliceAfter(
									syntax_conditions.filter(({ tokens: token_matches, not_tokens }) => (
										(!token_matches || string_is(token, ...token_matches)) &&
										(!not_tokens || !string_is(token, ...not_tokens))
									)),
									({ condition }) => !condition
								)
							])
						)
					]
				}))

	const getParserStep = (scope, instance, token_lookup, passthrough) => {
		// Get a parser step for a particular parser instance

		// Condition matcher (this used to be more complex but was made mostly redundant by quick_conditions)
		const matchingCondition = ({ condition }) => !condition || condition.call(instance, scope)

		const parserStepCall = () => {
			// This is called for each character in the string being parsed

			// Get the syntax currently being read, fall back to default
			const ct = scope.currentType || 'syntax_system_default'
			// Classify the currently read character as a token, fall back to default
			const cc = tokens[token_lookup[scope.currentCharacter]] || 'token_system_default'
			// Find a condition matching the current syntax and token, as well as any other requirements
			const foundCondition = quick_conditions[ct][cc].find(matchingCondition)

			// Get the action function or fall back to the default action
			const action = (foundCondition ? foundCondition.action : false) || defaultAction

			// Execute the action
			const result = action.call(instance, scope, passthrough)

			// Always append to the reserve, for output in case of failure (not yet implemented)
			scope.reserve += scope.currentCharacter

			// Handle the result if one was returned
			if (result) {
				// Set buffer value
				if (result.setBuffer !== undefined)
					scope.buffer = result.setBuffer
				// Append to buffer value
				if (result.buffer !== undefined)
					scope.buffer += result.buffer
			}

			// Return condition so that its index can be looked up for debug purposes
			return foundCondition
		}
		return parserStepCall
	}

	const parse = (instance, writers, instance_tokens = {}) => {
		// Create a parser instance with a particular config

		// Normalise the given tokens by capitalising the keys
		const normalised_instance_tokens = Object.fromEntries(
			Object.entries(instance_tokens).map(([ tok, vals ]) => [ tok.toUpperCase(), vals ])
		)
		// Check all the given tokens for validity
		Object.keys(tokens).forEach(tok => {
			if (system_tokens.includes(tok)) return
			const token_list = normalised_instance_tokens[tok]
			if (!token_list || !Array.isArray(token_list) || token_list.length === 0)
				throw new Error(`Tokens must include "${tok}" as a list of string characters.`)
			token_list.forEach(t => {
				if (typeof t !== 'string')
					throw new Error(`Token must be a string, ${typeof t} given.`)
				if (t.length !== 1)
					throw new Error(`Token must be a single character, "${t}" is ${t.length} characters.`)
			})
		})
		// Create a lookup table for easy access
		const token_lookup = invertAliasIndex(normalised_instance_tokens)

		const validate_writer = (name, writer) => {
			// Validate a writer object against the given writer interface
			if (typeof writer.inst !== 'function')
				throw new Error(`The ${name} writer must implement an 'inst' method that creates a new object to write data to.`)
			if (typeof writer.dump !== 'function')
				throw new Error(`The ${name} writer must implement a 'dump' method that outputs the result after the writing is complete.`)
			Object.entries(writer_interface)
				.forEach(([ method, reason ]) => {
					if (typeof writer[method] !== 'function')
						throw new Error(`The ${name} writer must implement a '${method}' method${reason?(' '+reason):''}.`)
				})
		}

		// Check the existing writers implement the required methods
		Object.entries(writers)
			.forEach(([ name, writer ]) => {
				validate_writer(name, writer)
			})

		const parse_instance = (str = '', args = {}, options = {}) => {
			const {
				debug: debug_call = false,
				writer = writers.default,
				outputString = false
			} = options

			// Check the custom writer implements the required interface
			validate_writer('custom', writer)

			// Init scope
			const scope = new Scope(str, args, writer, instance.parse_js)

			// The debug function that reports data on each step
			const debug = (index, chosenCondition) =>
				debug_call(index, JSON.parse(JSON.stringify(scope.data)), chosenCondition)
			// The debug call that will be passed through to writer.nest calls, takes index first to re-base the debug pointer
			const subDebugCall = debug_call
				? (index) => (ind, dat, ch) => debug_call(index+ind+1, dat, ch)
				: () => false

			// All options passed through to the writer.nest calls
			const passthrough = { ...options, debug: subDebugCall }
			// The instance that will be passed through to all actions, and can be refered to as `this` inside the actions
			const pass_instance = {
				isToken(str, ...toks) {
					const str_token = token_lookup[str]
					const str_token_const = tokens[str_token]
					return toks.some(tok =>
						tok.toUpperCase() === str_token || tok.toLowerCase() === str_token_const)
				},
				tokens,
				syntax,
				...instance
			}
			// Get a parser instance for this scope
			const parserStep = getParserStep(scope, pass_instance, token_lookup, passthrough)

			// Zero-th debug step, before any action
			if (debug_call && quick_conditions.syntax_system_start.token_system_default.length === 0)
				debug(0, -2)
			quick_conditions.syntax_system_start.token_system_default
				.forEach(condition => {
					condition.action.call(pass_instance, scope, passthrough)
					if (debug_call)
						debug(0, normalised_conditions.indexOf(condition))
				})


			// Parse every character of the string one by one
			while (scope.next) {
				const foundCondition = parserStep()

				// Record each step of the parsing
				if (debug_call)
					debug(scope.index+1, normalised_conditions.indexOf(foundCondition))
			}

			// Final debug step, after all actions
			if (debug_call && quick_conditions.syntax_system_end.token_system_default.length === 0)
				debug(str.length+1, -3)
			quick_conditions.syntax_system_end.token_system_default
				.forEach(condition => {
					condition.action.call(pass_instance, scope, passthrough)
					if (debug_call)
						debug(str.length+1, normalised_conditions.indexOf(condition))
				})


			// Output final result
			if (outputString && scope.writer.dumpString)
				return scope.writer.dumpString()
			return scope.writer.dump()
		}

		return parse_instance
	}

	return parse
}

// Language-specific parser for HTMA
const htma_parser = (() => {

	// System tags for programatic tags
	const tags = {
		IF: 'if',
		VAR: 'var',
		FUNC: 'func',
		ARGS: 'args',
		ELSE: 'else',
		ELSEIF: 'elseif',
		FOR: 'for'
	}

	// System tags grouped by ability
	const tag_groups = {
		system: [tags.VAR,tags.FOR,tags.IF,tags.ELSE,tags.ELSEIF,tags.ARGS,tags.FUNC],
		condition: [tags.IF,tags.ELSE,tags.ELSEIF],
		else: [tags.ELSE,tags.ELSEIF],
		if: [tags.IF,tags.ELSEIF],
		var: [tags.VAR,tags.FUNC],
	}

	// List of HTML tags that are allowed to be self-closing
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

	const attribute_transformer = (attributeTransformations, prop) => {
		// Get attribute transformation config for a given attribute name, fill in from & fall back to default
		const attr_tr = attributeTransformations[prop]
		if (attr_tr)
			return { ...attributeTransformations.DEFAULT, ...attr_tr }
		return attributeTransformations.DEFAULT
	}

	const transform_attributes = (attributeTransformations, attrs, orig={}) =>
		// Group attribute transformation
		Object
			.entries(attrs)
			.reduce(transform_attribute(attributeTransformations), orig)

	const transform_attribute = attributeTransformations => (acc, [ prop, val ]) => {
		// Transform a single attribute based on the attribute transformation config

		// Get the attribute transformation config
		const attr_tr = attribute_transformer(attributeTransformations, prop)

		// Check the attribute value is valid first
		if (attr_tr.validate && !attr_tr.validate(val))
			return acc

		// Transform the attribute to others if the value is found in the transformations
		if (attr_tr.trans) {

			const transed = typeof attr_tr.trans === 'function'
				? attr_tr.trans(val)
				: attr_tr.trans[val]

			// Recursively transform the resulting attributes to ensure they are all resolved
			if (transed)
				return transform_attributes(attributeTransformations, transed, acc)

			// Do nothing if the value is not transformable
			return acc
		}
		// If the atrribute has no transformations, just add it to the attribute object normally
		return add_attribute(attributeTransformations, acc, prop, val)
	}

	const add_attribute = (attributeTransformations, attrs, attr, attrVal) => {
		// Add an attribute to the attribute object using the methods in the attribute transformation config
		const attr_tr = attribute_transformer(attributeTransformations, attr)
		return {
			...attrs,
			[attr]: attr_tr.add(
				attrs[attr],
				attr_tr.parse(attrVal)
			)
		}
	}

	// Named actions that are taken by the parser, used only in the conditions list
	const actions = {
		inline_expression(tag) {
			return tag.attrs.id+((tag.attrs.class && tag.attrs.class.length) ? ('.'+tag.attrs.class.join('.')) : '')
		},
		open_tag(scope, tag, passthrough) {
			const conditional = scope.currentCondition
			if (conditional === false) {
				if (string_is(tag.name, tag_groups.var)) {
					scope.stop_reading(this.syntax.TAG)
					if (tag.indent !== undefined) {
						scope.start_reading(this.syntax.INDENT)
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

				scope.stop_reading(this.syntax.TAG)
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


					scope.start_reading(this.syntax.LOOP, {
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
							exp = actions.inline_expression.call(this, tag)
						result = exp ? scope.exec(exp) : scope.props
					}


					scope.stop_reading(this.syntax.TAG)
					// reading attr value? send to buffer
					scope.buffer = result//.toString()
					buff = true
					if (scope.is_reading(this.syntax.ATTRVAL, true)) {
					} else
					// reading tag content? assume attrname
					if (scope.is_reading(this.syntax.TAGCONTENT)) {
						scope.start_reading(this.syntax.ATTR)
						scope.start_reading(this.syntax.ATTRNAME)
					} else
					// Reading nothing? start reading content
					{
						if (!scope.is_reading(this.syntax.CONTENT))
							scope.start_reading(this.syntax.CONTENT)
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
						exp = actions.inline_expression.call(this, tag)

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

					scope.stop_reading(this.syntax.TAG)
					// reading attr value? send to buffer
					scope.buffer = result//.toString()
					buff = true
					if (scope.is_reading(this.syntax.ATTRVAL, true)) {
					} else
					// reading tag content? assume attrname
					if (scope.is_reading(this.syntax.TAGCONTENT)) {
						scope.start_reading(this.syntax.ATTR)
						scope.start_reading(this.syntax.ATTRNAME)
					} else
					// Reading nothing? start reading content
					{
						if (!scope.is_reading(this.syntax.CONTENT))
							scope.start_reading(this.syntax.CONTENT)
					}
				} else
				if (tag.name === tags.ARGS) {
					if (scope.is_reading(this.syntax.TAGCONTENT, true)) {
						const exp = tag.attrs.exp
							? tag.attrs.exp
							: (tag.attrs.id
									? actions.inline_expression.call(this, tag)
									: false)
						const result = exp ? scope.exec(exp) : scope.props
						if (typeof result === 'object') {
							const par_tag = actions.parent_tag.call(this, scope)
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
								? actions.inline_expression.call(this, tag)
								: 'undefined')
					const result = scope.exec(exp)
					tag.eval = Boolean(result)
				}
			}
			if (conditional !== false && scope.currentCondition !== false && !string_is(tag.name, tag_groups.system)) {
				const selfClosing = tag.selfClosing || self_closing_tags[tag.name] || false
				const attrs = transform_attributes(this.attributeTransformations, tag.attrs)
				scope.writer.open({
					name: tag.name,
					indent: tag.indent,
					selfClosing,
					attrs: Object
						.entries(attrs)
						.map(([ prop, val ]) => [ prop, attribute_transformer(this.attributeTransformations, prop).write.call(this, val) ])
				})
				if (selfClosing)
					scope.stop_reading(this.syntax.TAG, true)
			}
			if (string_is(tag.name, tag_groups.condition) || scope.condition(tag.indent, true) !== undefined) {
				scope.setCondition(tag.indent, tag.eval)
			}

			}
			if (!buff)
				return { setBuffer: '' }
		},
		close_tags(scope, min_indent) {
			const siblings_and_nephews = scope.get_all_reading_data(this.syntax.TAG, ({ indent }) => indent < min_indent)
			siblings_and_nephews
				.forEach(tag => {
					const { indent, name } = tag
					const print_close = name &&
						scope.condition(indent) !== false &&
						!string_is(name, tag_groups.system)

					scope.stop_reading(this.syntax.TAG, true)
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
			scope.stop_reading(this.syntax.LOOP)
			scope.start_reading(this.syntax.INDENT)
		},


		clear_buffer (scope) {
			return { setBuffer: '' }
		},
		read_character(scope) {
			return { buffer: scope.currentCharacter }
		},
		read_content(scope) {
			if (scope.currentCondition !== false)
				scope.writer.content(scope.buffer)
		},
		parent_tag(scope) {
			return scope.reading[scope.reading.findIndex(({ type }) => type === this.syntax.TAGCONTENT)+1].data
		},


		mark_tag_self_closing(scope) {
			const tag = scope.get_reading_data(this.syntax.TAG)
			tag.selfClosing = true
		},

		close_tag_after_tag_content(scope, passthrough) {
			const tag = actions.parent_tag.call(this, scope)
			scope.stop_reading(this.syntax.TAGCONTENT, true)
			return actions.open_tag.call(this, scope, tag, passthrough)
		},
		close_tag_after_id(scope, passthrough) {
			const tag = actions.stop_reading_id.call(this, scope)
			return actions.open_tag.call(this, scope, tag, passthrough)
		},
		close_tag_after_class(scope, passthrough) {
			const tag = actions.stop_reading_class.call(this, scope)
			return actions.open_tag.call(this, scope, tag, passthrough)
		},

		start_reading_string(scope){
			scope.start_reading(this.syntax.STRING, { open: scope.currentCharacter })
		},
		stop_reading_string(scope){
			scope.stop_reading(this.syntax.STRING, true)
		},

		start_reading_escape(scope){
			scope.start_reading(this.syntax.ESCAPE)
		},
		stop_reading_escape(scope){
			scope.stop_reading(this.syntax.ESCAPE)
			return { buffer: '\\'+scope.currentCharacter }
		},

		stop_reading_class(scope) {
			const tag = scope.get_reading_data(this.syntax.TAG)
			tag.attrs = add_attribute(this.attributeTransformations, tag.attrs, 'class', scope.buffer)
			scope.stop_reading(this.syntax.CLASS)
			return tag
		},
		stop_reading_id(scope) {
			const tag = scope.get_reading_data(this.syntax.TAG)
			tag.attrs = add_attribute(this.attributeTransformations, tag.attrs, 'id', scope.buffer)
			scope.stop_reading(this.syntax.ID)
			return tag
		},

		start_reading_tag(scope) {
			const child_tag = {attrs:{}}
			scope.start_reading(this.syntax.TAG, child_tag)
			scope.start_reading(this.syntax.TAGNAME)
			return child_tag
		},
		start_reading_tag_after_content(scope) {
			actions.read_content.call(this, scope)
			actions.start_reading_tag.call(this, scope)
		},
		start_reading_tag_after_indent(scope) {
			const indent = scope.buffer.length
			scope.stop_reading(this.syntax.INDENT)
			actions.close_tags.call(this, scope, indent)
			const child_tag = actions.start_reading_tag.call(this, scope)
			child_tag.indent = indent
		},
		start_reading_tag_inside_attribute_value(scope) {
			scope.get_reading_data(this.syntax.ATTRVAL).value = scope.buffer
			actions.start_reading_tag.call(this, scope)
		},
		start_reading_tag_content_after_class(scope, passthrough) {
			actions.stop_reading_class.call(this, scope)
			scope.start_reading(this.syntax.TAGCONTENT)
		},
		start_reading_tag_content_after_id(scope, passthrough) {
			actions.stop_reading_id.call(this, scope)
			scope.start_reading(this.syntax.TAGCONTENT)
		},
		start_reading_tag_attributes(scope) {
			const attr_data = {}
			if (scope.is_reading(this.syntax.INDENT)) {
				attr_data.indent = scope.buffer.length
				scope.stop_reading(this.syntax.INDENT)
			}
			scope.start_reading(this.syntax.ATTR, attr_data)
			scope.start_reading(this.syntax.ATTRNAME)
			return { setBuffer: scope.currentCharacter }
		},

		start_reading_class_after_class(scope, passthrough) {
			actions.stop_reading_class.call(this, scope)
			scope.start_reading(this.syntax.CLASS)
		},
		start_reading_class_after_id(scope, passthrough) {
			actions.stop_reading_id.call(this, scope)
			scope.start_reading(this.syntax.CLASS)
		},

		start_reading_indent_after_class(scope) {
			actions.start_reading_tag_content_after_class.call(this, scope)
			scope.start_reading(this.syntax.INDENT)
		},
		start_reading_indent_after_id(scope, passthrough) {
			actions.start_reading_tag_content_after_id.call(this, scope)
			scope.start_reading(this.syntax.INDENT)
		},
		start_reading_indent_after_newline(scope) {
			actions.read_content.call(this, scope)
			scope.start_reading(this.syntax.INDENT)
			return { setBuffer: '' }
		},
		start_reading_indent_after_content(scope) {
			actions.read_content.call(this, scope)
			scope.stop_reading(this.syntax.CONTENT)
			scope.start_reading(this.syntax.INDENT)
			return { setBuffer: '' }
		},
		start_reading_content_after_indent(scope) {
			scope.stop_reading(this.syntax.INDENT)
			scope.start_reading(this.syntax.CONTENT, { indent: scope.buffer.length })
			return { setBuffer: scope.currentCharacter }
		},
	}

	// Return the parser for this language
	return parser(
		[
			{
				syntax: syntax => syntax.START,
				action(scope) {
					scope.start_reading(this.syntax.INDENT)
				}
			},
			{
				syntax: syntax => syntax.END,
				action(scope) {
					// Write any remaining content
					if (scope.is_reading(this.syntax.CONTENT)) {
						actions.read_content.call(this, scope)
						scope.stop_reading(this.syntax.CONTENT)
					}
					// Close all remaining tags
					actions.close_tags.call(this, scope, 0)
				}
			},
			{
				syntax: syntax => syntax.LOOP,
				action(scope, { debug, ...passthrough }) {
					const tag = scope.get_reading_data(this.syntax.TAG)
					const loop = scope.reading_data
					if (this.isToken(scope.currentCharacter, this.tokens.NEWLINE)) {
						loop.indent = 0
					} else
					if (this.isToken(scope.currentCharacter, this.tokens.INDENT)) {
						loop.indent += 1
					}
					if (!scope.followingCharacter ||
						(
							!this.isToken(scope.followingCharacter, this.tokens.INDENT, this.tokens.NEWLINE) &&
							loop.indent <= tag.indent
						)
					) {
						actions.render_loop.call(this, scope, loop, { ...passthrough, debug: debug(loop.index) })
					} else {
						return { buffer: scope.currentCharacter }
					}
				}
			},
			{
				syntax: syntax => syntax.TAGNAME,
				tokens: tokens => [tokens.INDENT, tokens.NEWLINE, tokens.IDMARKER, tokens.CLASSSEPARATOR, tokens.CLOSETAG],
				action(scope, passthrough) {
					const tag = scope.get_reading_data(this.syntax.TAG)
					const tagName = scope.buffer
					const lowerTagName = tagName.toLowerCase()
					const finalName = custom_components[tagName] ? tagName : (this.tagAliases[lowerTagName] || lowerTagName)
					tag.name = finalName
					scope.stop_reading(this.syntax.TAGNAME)
					if (!string_is(tag.name, tag_groups.else) && scope.condition(tag.indent, true) !== undefined) {
						scope.setCondition(tag.indent, undefined)
					}

					if (this.isToken(scope.currentCharacter, this.tokens.CLOSETAG)) {
						return actions.open_tag.call(this, scope, tag, passthrough)
					} else
					if (this.isToken(scope.currentCharacter, this.tokens.IDMARKER)) {
						scope.start_reading(this.syntax.ID)
					} else
					if (this.isToken(scope.currentCharacter, this.tokens.CLASSSEPARATOR)) {
						scope.start_reading(this.syntax.CLASS)
					} else
					if (this.isToken(scope.currentCharacter, this.tokens.INDENT, this.tokens.NEWLINE)) {
						scope.start_reading(this.syntax.TAGCONTENT)
						if (this.isToken(scope.currentCharacter, this.tokens.NEWLINE)) {
							scope.start_reading(this.syntax.INDENT)
						}
					}
				}
			},
			{
				syntax: syntax => syntax.ATTRNAME,
				condition(scope) {
					return scope.is_reading(this.syntax.TAGCONTENT, true)
				},
				tokens: tokens => [tokens.INDENT, tokens.NEWLINE, tokens.CLOSETAG, tokens.ATTRASSIGN],
				action(scope, passthrough) {

					const tag = actions.parent_tag.call(this, scope)

					const attributeAliases = this.tagAttributeAliases[tag.name] || {}
					const attrName = scope.buffer.toLowerCase()
					tag.current_attr = attributeAliases[attrName] || this.commonAttributeAliases[attrName] || attrName
					scope.stop_reading(this.syntax.ATTRNAME)

					if (this.isToken(scope.currentCharacter, this.tokens.CLOSETAG)) {
						scope.stop_reading(this.syntax.ATTR)
						scope.stop_reading(this.syntax.TAGCONTENT, true)
						if (scope.currentCondition)
							tag.attrs[tag.current_attr] = true
						return actions.open_tag.call(this, scope, tag, passthrough)
					} else
					if (this.isToken(scope.currentCharacter, this.tokens.ATTRASSIGN)) {
						scope.start_reading(this.syntax.ATTRVAL, {value:''})
					} else
					if (this.isToken(scope.currentCharacter, this.tokens.INDENT, this.tokens.NEWLINE)) {
						if (scope.currentCondition)
							tag.attrs[tag.current_attr] = true
						scope.stop_reading(this.syntax.ATTR)
						if (this.isToken(scope.currentCharacter, this.tokens.NEWLINE)) {
							scope.start_reading(this.syntax.INDENT)
						}
					}
				}
			},
			{
				syntax: syntax => syntax.ATTRVAL,
				tokens: tokens => [tokens.INDENT, tokens.NEWLINE, tokens.CLOSETAG],
				action(scope, passthrough) {
					const attributeCondition = scope.currentCondition
					const prevVal = scope.get_reading_data(this.syntax.ATTRVAL).value
					const curVal = scope.buffer
					const attrVal = prevVal ? (prevVal + curVal) : curVal

					scope.stop_reading(this.syntax.ATTRVAL)
					scope.stop_reading(this.syntax.ATTR)
					const tag = actions.parent_tag.call(this, scope)

					if (attributeCondition)
						tag.attrs = add_attribute(this.attributeTransformations, tag.attrs, tag.current_attr, attrVal)

					if (this.isToken(scope.currentCharacter, this.tokens.CLOSETAG)) {
						scope.stop_reading(this.syntax.TAGCONTENT)
						return actions.open_tag.call(this, scope, tag, passthrough)
					} else
					if (this.isToken(scope.currentCharacter, this.tokens.NEWLINE)) {
						scope.start_reading(this.syntax.INDENT)
					}
					return { setBuffer: '' }
				}
			},





			{
				syntax: syntax => syntax.ID,
				tokens: tokens => tokens.INDENT,
				action: actions.start_reading_tag_content_after_id,
			},
			{
				syntax: syntax => syntax.ID,
				tokens: tokens => tokens.NEWLINE,
				action: actions.start_reading_indent_after_id,
			},
			{
				syntax: syntax => syntax.ID,
				tokens: tokens => tokens.CLASSSEPARATOR,
				action: actions.start_reading_class_after_id,
			},
			{
				syntax: syntax => syntax.ID,
				tokens: tokens => tokens.CLOSETAG,
				action: actions.close_tag_after_id,
			},
			{
				syntax: syntax => syntax.CLASS,
				tokens: tokens => tokens.INDENT,
				action: actions.start_reading_tag_content_after_class,
			},
			{
				syntax: syntax => syntax.CLASS,
				tokens: tokens => tokens.NEWLINE,
				action: actions.start_reading_indent_after_class,
			},
			{
				syntax: syntax => syntax.CLASS,
				tokens: tokens => tokens.CLASSSEPARATOR,
				action: actions.start_reading_class_after_class,
			},
			{
				syntax: syntax => syntax.CLASS,
				tokens: tokens => tokens.CLOSETAG,
				action: actions.close_tag_after_class,
			},
			{
				syntax: syntax => syntax.ESCAPE,
				condition(scope) {
					return scope.is_reading(this.syntax.STRING, true)
				},
				action: actions.stop_reading_escape
			},
			{
				syntax: syntax => syntax.STRING,
				// not_syntax: syntax => syntax.ESCAPE,
				tokens: tokens => tokens.ESCAPE,
				action: actions.start_reading_escape
			},
			{
				not_syntax: syntax => syntax.ESCAPE,
				condition(scope) {
					return array_sliceAt(scope.reading,
								({ type }) => type === this.syntax.STRING)
							.every	(({ type }) => type !== this.syntax.ATTRVAL) &&

					// scope.is_reading(this.syntax.STRING, true) &&
						scope.currentCharacter === scope.get_reading_data(this.syntax.STRING).open
				},
				action: actions.stop_reading_string
			},
			{
				condition(scope) {
					return scope.is_reading(this.syntax.ATTRVAL, true)
				},
				tokens: tokens => tokens.OPENTAG,
				action: actions.start_reading_tag_inside_attribute_value
			},
			{
				syntax: syntax => syntax.INDENT,
				tokens: tokens => tokens.OPENTAG,
				action: actions.start_reading_tag_after_indent
			},
			{
				syntax: syntax => syntax.CONTENT,
				tokens: tokens => tokens.OPENTAG,
				action: actions.start_reading_tag_after_content
			},
			{
				// syntax: syntax => syntax.TAGCONTENT,
				tokens: tokens => tokens.OPENTAG,
				action: actions.start_reading_tag
			},
			{
				syntax: syntax => syntax.STRING,
				action: actions.read_character
			},
			{
				not_syntax: syntax => syntax.STRING,
				tokens: tokens => tokens.SELFCLOSE,
				condition(scope) {
					return scope.is_reading(this.syntax.TAG, true) && this.isToken(scope.followingCharacter, this.tokens.CLOSETAG)
				},
				action: actions.mark_tag_self_closing
			},
			{
				syntax: syntax => syntax.ATTRVAL,
				tokens: tokens => tokens.QUOTE,
				condition(scope) {
					const existing_buffer = scope.buffer
					scope.buffer = existing_buffer
					return !existing_buffer
				},
				action: actions.start_reading_string
			},
			{
				condition(scope) {
					return scope.is_reading(this.syntax.TAGCONTENT, true)
				},
				tokens: tokens => tokens.CLOSETAG,
				action: actions.close_tag_after_tag_content
			},
			{
				syntax: syntax => syntax.CONTENT,
				tokens: tokens => tokens.NEWLINE,
				action: actions.start_reading_indent_after_content
			},
			{
				syntax: syntax => syntax.INDENT,
				tokens: tokens => tokens.NEWLINE,
				action: actions.clear_buffer
			},
			{
				tokens: tokens => tokens.NEWLINE,
				action: actions.start_reading_indent_after_newline
			},
			{
				not_tokens: tokens => [tokens.INDENT, tokens.NEWLINE],
				condition(scope) {
					return scope.is_reading(this.syntax.TAGCONTENT, true)
							&& array_sliceAt(scope.reading,
										({ type }) => type === this.syntax.TAGCONTENT)
									.every	(({ type }) => !string_is(type, [this.syntax.ATTR, this.syntax.TAGNAME, this.syntax.ID, this.syntax.CLASS]))
				},
				action: actions.start_reading_tag_attributes
			},
			{
				syntax: syntax => syntax.INDENT,
				not_tokens: tokens => tokens.INDENT,
				action: actions.start_reading_content_after_indent
			}
		],
		["CONTENT", "INDENT", "TAG", "TAGNAME", "CLASS", "ID", "TAGCONTENT", "ATTR", "ATTRNAME", "ATTRVAL", "STRING", "ESCAPE", "LOOP"],
		["INDENT", "NEWLINE", "CLOSETAG", "OPENTAG", "CLASSSEPARATOR", "IDMARKER", "QUOTE", "ATTRASSIGN", "ESCAPE", "SELFCLOSE"],
		{
			open: "that is called when a tag is opened",
			close: "that is called when a tag is closed",
			content: "that is called when plain text content is encountered",
			nest: "that is called for a custom component and on each step of a loop"
		}
	)
})()

// Language-specific parser for CSS
const css_parser = (() => {

	// Named actions that are taken by the parser, used only in the conditions list
	// TODO: enforce no unit on b for a/b
	// TODO: enforce no unit on a or b for a*b
	const actions = {
		do_nothing(scope) {
			return {buffer:''}
		},
		read_character(scope) {
			return {buffer:scope.currentCharacter}
		},
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
						return `${(prev && prev.operator)?' ':''}(${actions.value(scope, p, calced || isCalc)})`

					if (p.operator)
						return ' '+p.operator

					return `${i===0?'':' '}${p.value}${p.unit||'px'}`
				}).join('')

			if (isCalc)
				out += ')'

			return out
		},
		stop_reading_prop(scope, prop) {
			scope.stop_reading(this.syntax.PROP, true)
			if (prop.value) {
				scope.writer.prop(prop.name, actions.value(scope, prop.value))
			} else
			if (this.css_transformations[prop.name]) {
				Object.entries(this.css_transformations[prop.name])
					.forEach(pv => {
						scope.writer.prop(...pv)
					});
			}
		},
		set_value_unit(scope) {
			const val = scope.get_reading_data(this.syntax.VALUE)
			val.unit = scope.buffer
			return val
		},
		set_value_value(scope) {
			const val = scope.get_reading_data(this.syntax.VALUE)
			val.value = scope.buffer
			return val
		},


		start_reading_prop_name(scope) {
			scope.start_reading(this.syntax.PROP, {})
			scope.start_reading(this.syntax.PROPNAME)
			return {buffer:scope.currentCharacter}
		},
		start_reading_value(scope) {
			scope.start_reading(this.syntax.VALUE, {value:'',unit:false})
			return {buffer:scope.currentCharacter}
		},
		start_reading_unit_after_value(scope) {
			const val = scope.get_reading_data(this.syntax.VALUE)
			val.value = scope.buffer
			scope.start_reading(this.syntax.UNIT)
			return {buffer:scope.currentCharacter}
		},
		start_reading_bracket(scope) {
			const prop = scope.get_reading_data(this.syntax.PROP)
			actions.read_string_value.call(this, scope, prop)
			scope.start_reading(this.syntax.BRACE, {value:[]})
		},

		read_string_value(scope, prop) {
			const read = scope.buffer
			if (read)
				prop.value.push(read)
		},
		read_prop_value_after_prop_name(scope) {
			const prop = scope.get_reading_data(this.syntax.PROP)
			prop.name = scope.buffer
			prop.value = []
			scope.stop_reading(this.syntax.PROPNAME)
			scope.start_reading(this.syntax.PROPVAL)
		},

		read_operator_after_unit(scope) {
			const prop = scope.get_reading_data([this.syntax.PROP, this.syntax.BRACE])
			prop.value.push(actions.set_value_unit.call(this, scope))
			actions.read_operator.call(this, scope)
			scope.stop_reading(this.syntax.UNIT)
			scope.stop_reading(this.syntax.VALUE)
		},
		read_operator(scope) {
			const prop = scope.get_reading_data([this.syntax.PROP, this.syntax.BRACE])
			prop.value.push({operator:scope.currentCharacter})
		},
		read_operator_after_value(scope) {
			const prop = scope.get_reading_data([this.syntax.PROP, this.syntax.BRACE])
			prop.value.push(actions.set_value_value.call(this, scope))
			actions.read_operator.call(this, scope)
			scope.stop_reading(this.syntax.VALUE)
		},

		stop_reading_value(scope) {
			const prop = scope.get_reading_data([this.syntax.PROP, this.syntax.BRACE])
			const val = scope.get_reading_data(this.syntax.VALUE)
			val.value = scope.buffer
			prop.value.push(val)
			scope.stop_reading(this.syntax.VALUE)
		},
		stop_reading_bracket(scope) {
			scope.stop_reading(this.syntax.BRACE, true)
		},
		stop_reading_bracket_value(scope, val) {
			const prop = scope.get_reading_data(this.syntax.BRACE)
			prop.value.push(val)

			actions.stop_reading_bracket.call(this, scope)
			const par_prop = scope.get_reading_data([this.syntax.PROP, this.syntax.BRACE])
			par_prop.value.push(prop.value)
		},
		stop_reading_bracket_after_unit(scope) {
			return actions.stop_reading_bracket_value
				.call(this, scope, actions.set_value_unit.call(this, scope))
		},
		stop_reading_bracket_after_value(scope) {
			return actions.stop_reading_bracket_value
				.call(this, scope, actions.set_value_value.call(this, scope))
		},

		terminate_reading_unit(scope) {
			const prop = scope.get_reading_data(this.syntax.PROP)
			prop.value.push(actions.set_value_unit.call(this, scope))

			return actions.stop_reading_prop.call(this, scope, prop)
		},
		terminate_reading_value(scope) {
			const prop = scope.get_reading_data(this.syntax.PROP)
			prop.value.push(actions.set_value_value.call(this, scope))

			return actions.stop_reading_prop.call(this, scope, prop)
		},
		terminate_reading_prop_value(scope) {
			const prop = scope.get_reading_data(this.syntax.PROP)
			actions.read_string_value.call(this, scope, prop)

			return actions.stop_reading_prop.call(this, scope, prop)
		},
		terminate_reading_prop_name(scope) {
			const prop = scope.get_reading_data(this.syntax.PROP)
			prop.name = scope.buffer

			return actions.stop_reading_prop.call(this, scope, prop)
		},
		terminate(scope) {
			if (scope.is_reading(this.syntax.PROPNAME))
				return actions.terminate_reading_prop_name.call(this, scope)
			if (scope.is_reading(this.syntax.PROPVAL))
				return actions.terminate_reading_prop_value.call(this, scope)
			if (scope.is_reading(this.syntax.VALUE))
				return actions.terminate_reading_value.call(this, scope)
			if (scope.is_reading(this.syntax.UNIT))
				return actions.terminate_reading_unit.call(this, scope)
		}
	}

	// Return the parser for this language
	return parser(
		[
			{
				syntax: syntax => syntax.END,
				action: actions.terminate
			},
			{
				syntax: syntax => syntax.PROPNAME,
				tokens: tokens => tokens.ASSIGN,
				action: actions.read_prop_value_after_prop_name
			},
			{
				syntax: syntax => syntax.PROPNAME,
				tokens: tokens => tokens.TERMINATE,
				action: actions.terminate_reading_prop_name
			},
			{
				syntax: syntax => syntax.PROPVAL,
				tokens: tokens => tokens.TERMINATE,
				action: actions.terminate_reading_prop_value
			},
			{
				syntax: syntax => syntax.BRACE,
				tokens: tokens => tokens.TERMINATE,
				action(scope) {
					throw new Error('Unclosed bracket')
				}
			},
			{
				syntax: syntax => syntax.PROPVAL,
				tokens: tokens => tokens.OPENBRACE,
				action: actions.start_reading_bracket
			},
			{
				syntax: syntax => syntax.VALUE,
				tokens: tokens => tokens.CLOSEBRACE,
				condition(scope) {
					return scope.is_reading(this.syntax.BRACE, true)
				},
				action: actions.stop_reading_bracket_after_value
			},
			{
				syntax: syntax => syntax.UNIT,
				tokens: tokens => tokens.CLOSEBRACE,
				condition(scope) {
					return scope.is_reading(this.syntax.BRACE, true)
				},
				action: actions.stop_reading_bracket_after_unit
			},
			{
				syntax: syntax => syntax.BRACE,
				tokens: tokens => tokens.CLOSEBRACE,
				action: actions.stop_reading_bracket
			},
			{
				syntax: syntax => syntax.VALUE,
				tokens: tokens => tokens.TERMINATE,
				action: actions.terminate_reading_value
			},
			{
				syntax: syntax => syntax.UNIT,
				tokens: tokens => tokens.TERMINATE,
				action: actions.terminate_reading_unit
			},
			{
				syntax: syntax => syntax.VALUE,
				tokens: tokens => tokens.NUMERIC,
				action: actions.read_character
			},
			{
				syntax: syntax => syntax.VALUE,
				tokens: tokens => tokens.OPERATORS,
				action: actions.read_operator_after_value
			},
			{
				syntax: syntax => syntax.PROPVAL,
				tokens: tokens => tokens.OPERATORS,
				action: actions.read_operator
			},
			{
				syntax: syntax => syntax.UNIT,
				tokens: tokens => tokens.OPERATORS,
				action: actions.read_operator_after_unit
			},
			{
				syntax: syntax => syntax.UNIT,
				tokens: tokens => tokens.WHITESPACE,
				action: actions.do_nothing
			},
			{
				syntax: syntax => syntax.UNIT,
				action: actions.read_character
			},
			{
				syntax: syntax => syntax.VALUE,
				tokens: tokens => tokens.WHITESPACE,
				action: actions.stop_reading_value
			},
			{
				syntax: syntax => syntax.VALUE,
				action: actions.start_reading_unit_after_value
			},
			{
				syntax: syntax => [syntax.PROPVAL, syntax.BRACE],
				tokens: tokens => tokens.NUMERIC,
				action: actions.start_reading_value
			},
			{
				tokens: tokens => tokens.WHITESPACE,
				action: actions.do_nothing
			},
			{
				syntax: syntax => syntax.PROPNAME,
				action: actions.read_character
			},
			{
				syntax: syntax => [syntax.PROPVAL, syntax.BRACE],
				action: actions.read_character
			},
			{
				tokens: tokens => tokens.TERMINATE,
				action: actions.do_nothing
			},
			{
				not_syntax: syntax => syntax.START,
				action: actions.start_reading_prop_name
			}
		],
		["PROP", "PROPNAME", "PROPVAL", "VALUE", "UNIT", "BRACE"],
		["ASSIGN", "TERMINATE", "WHITESPACE", "NUMERIC", "OPERATORS", "OPENBRACE", "CLOSEBRACE"],
		{
			prop: "that is called for each property"
		}
	)
})()

const js_parser = (() => {
	return parser(
		[
			{
				syntax: syntax => syntax.END,
				action(scope) {
					if (scope.is_reading(this.syntax.VAR)) {
						scope.writer.var(scope.buffer)
					} else {
						scope.writer.other(scope.buffer)
					}
				}
			},
			{
				syntax: syntax => syntax.START,
				action(scope) {
				}
			},
			{
				syntax: syntax => syntax.STRING,
				tokens: tokens => tokens.QUOTE,
				condition(scope) {
					return scope.reading_data.open === scope.currentCharacter
				},
				action(scope) {
					scope.stop_reading(this.syntax.STRING)
					return {buffer:scope.currentCharacter}
				}
			},
			{
				syntax: syntax => syntax.STRING,
				tokens: tokens => tokens.ESCAPE,
				action(scope) {
					scope.start_reading(this.syntax.ESCAPE)
					return {buffer:scope.currentCharacter}
				}
			},
			{
				syntax: syntax => syntax.ESCAPE,
				action(scope) {
					scope.stop_reading(this.syntax.ESCAPE)
					return {buffer:scope.currentCharacter}
				}
			},
			{
				tokens: tokens => tokens.QUOTE,
				syntax: syntax => syntax.OBJECT,
				action(scope) {
					scope.start_reading(this.syntax.OBJKEY)
					scope.start_reading(this.syntax.STRING, {open:scope.currentCharacter})
					return {buffer:scope.currentCharacter}
				}
			},
			{
				tokens: tokens => tokens.QUOTE,
				action(scope) {
					scope.start_reading(this.syntax.STRING, {open:scope.currentCharacter})
					return {buffer:scope.currentCharacter}
				}
			},
			{
				tokens: tokens => tokens.CURLYBRACEOPEN,
				action(scope) {
					scope.start_reading(this.syntax.OBJECT)
					return {buffer:scope.currentCharacter}
				}
			},
			{
				syntax: syntax => syntax.OBJECT,
				tokens: tokens => tokens.DEFAULT,
				action(scope) {
					scope.start_reading(this.syntax.OBJKEY)
					return {buffer:scope.currentCharacter}
				}
			},
			{
				syntax: syntax => syntax.OBJECT,
				tokens: tokens => tokens.SQUAREBRACEOPEN,
				action(scope) {
					scope.start_reading(this.syntax.OBJKEY)
					scope.start_reading(this.syntax.OBJKEYDYN)
					return {buffer:scope.currentCharacter}
				}
			},
			{
				syntax: syntax => syntax.OBJKEY,
				tokens: tokens => tokens.OBJASSIGN,
				action(scope) {
					scope.stop_reading(this.syntax.OBJKEY)
					scope.start_reading(this.syntax.OBJVAL)
					return {buffer:scope.currentCharacter}
				}
			},
			{
				syntax: syntax => syntax.VAR,
				tokens: tokens => tokens.BRACEOPEN,
				action(scope) {
					scope.writer.var(scope.buffer)
					scope.stop_reading(this.syntax.VAR)
					scope.start_reading(this.syntax.FUNCARGS)
					return {buffer:scope.currentCharacter}
				}
			},
			{
				syntax: syntax => syntax.VAR,
				tokens: tokens => tokens.BRACECLOSE,
				action(scope) {
					scope.writer.var(scope.buffer)
					scope.stop_reading(this.syntax.VAR)
					if (scope.is_reading(this.syntax.FUNCARGS))
						scope.stop_reading(this.syntax.FUNCARGS)
					return {buffer:scope.currentCharacter}
				}
			},
			{
				syntax: syntax => syntax.FUNCARGS,
				tokens: tokens => tokens.BRACECLOSE,
				action(scope) {
					scope.stop_reading(this.syntax.FUNCARGS)
					return {buffer:scope.currentCharacter}
				}
			},
			{
				syntax: syntax => syntax.VAR,
				tokens: tokens => tokens.SQUAREBRACEOPEN,
				action(scope) {
					scope.writer.var(scope.buffer)
					scope.stop_reading(this.syntax.VAR)
					scope.start_reading(this.syntax.OBJKEYDYN)
					return {buffer:scope.currentCharacter}
				}
			},
			{
				syntax: syntax => syntax.VAR,
				tokens: tokens => tokens.SQUAREBRACECLOSE,
				action(scope) {
					scope.writer.var(scope.buffer)
					scope.stop_reading(this.syntax.VAR)
					if (scope.is_reading(this.syntax.ARRAY))
						scope.stop_reading(this.syntax.ARRAY)
					else
					if (scope.is_reading(this.syntax.OBJKEYDYN))
						scope.stop_reading(this.syntax.OBJKEYDYN)
					return {buffer:scope.currentCharacter}
				}
			},
			{
				syntax: syntax => syntax.OBJKEYDYN,
				tokens: tokens => tokens.SQUAREBRACECLOSE,
				action(scope) {
					// scope.writer.other(scope.buffer)
					// if (scope.is_reading(this.syntax.ARRAY))
					// 	scope.stop_reading(this.syntax.ARRAY)
					// else
					// if (scope.is_reading(this.syntax.OBJKEYDYN))
					scope.stop_reading(this.syntax.OBJKEYDYN)
					return {buffer:scope.currentCharacter}
				}
			},
			{
				tokens: tokens => tokens.SQUAREBRACEOPEN,
				action(scope) {
					scope.start_reading(this.syntax.ARRAY)
					return {buffer:scope.currentCharacter}
				}
			},
			{
				not_syntax: syntax => syntax.STRING,
				tokens: tokens => tokens.CURLYBRACECLOSE,
				condition(scope) {
					return scope.is_reading(this.syntax.OBJECT, true)
				},
				action(scope) {
					if (scope.is_reading(this.syntax.VAR))
						scope.writer.var(scope.buffer)
					scope.stop_reading(this.syntax.OBJECT, true)
					return {buffer:scope.currentCharacter}
				}
			},
			{
				syntax: syntax => syntax.VAR,
				tokens: tokens => [tokens.OPERATOR,tokens.SEPARATOR],
				action(scope) {
					scope.writer.var(scope.buffer)
					scope.stop_reading(this.syntax.VAR)
					return {buffer:scope.currentCharacter}
				}
			},
			{
				not_syntax: syntax => [syntax.VAR,syntax.STRING,syntax.OBJKEY,syntax.OBJECT],
				tokens: tokens => tokens.DEFAULT,
				action(scope) {
					scope.writer.other(scope.buffer)
					scope.start_reading(this.syntax.VAR)
					return {buffer:scope.currentCharacter}
				}
			},
			{
				action(scope) {
					return {buffer:scope.currentCharacter}
				}
			}
		],
		["STRING","OBJECT","ARRAY","FUNCARGS","FUNCCONT","OBJVAL","OBJKEY","VAR","ESCAPE","OBJKEYDYN","DOT"],
		["CURLYBRACEOPEN","SQUAREBRACEOPEN","BRACEOPEN","CURLYBRACECLOSE","SQUAREBRACECLOSE","BRACECLOSE","QUOTE","OPERATOR","SEPARATOR","ESCAPE","OBJASSIGN","DOT"],
		{
			var: "",
			other: "",
		}
	)
})()


// HTMA instance
const instance = instanceOptions => {

	// CSS parser instance setup
	const css_writers = (() => {
		const object_writer = {
			inst: () => ({}),
			dumpString: inst => Object.entries(inst).map(([p,v]) => `${p}:${v};`).join(''),
			dump: inst => inst,
			prop: (inst, prop, val) => ({
				...inst,
				[prop]: val
			})
		}
		const string_writer = {
			inst: () => '',
			dump: inst => inst,
			prop: (inst, prop, val) => inst+`${prop}:${val};`
		}
		return {
			string: string_writer,
			object: object_writer,
			default: string_writer,
		}
	})()

	if (instanceOptions.css && instanceOptions.css.defaultWriter)
		css_writers.default = instanceOptions.css.defaultWriter

	const parse_css = css_parser({
		css_transformations: (
			instanceOptions.css &&
			instanceOptions.css.transformations &&
			instanceOptions.css.transformations.properties
		) || {}
	}, css_writers, (instanceOptions.css && instanceOptions.css.tokens) || {})

	const parse_js = js_parser(
		{rebase_name: 'internal_props'},
		{
			default: {
				inst: () => '',
				dump: inst => inst,
				var: (inst, name) => {
					const reseverd = ['true','false','typeof','instanceof','Math','Object','Array','Boolean','String','console','undefined','null','return']
					if (reseverd.includes(name)) return inst+name
					const first = name.charCodeAt(0)
					if (first >= 48 && first <= 57) return inst+name
					return inst+'internal_props.'+name
				},
				other: (inst, str) => inst+str
			}
		},
		{
			CURLYBRACEOPEN: ['{'],
			SQUAREBRACEOPEN: ['['],
			BRACEOPEN: ['('],
			CURLYBRACECLOSE: ['}'],
			SQUAREBRACECLOSE: [']'],
			BRACECLOSE: [')'],
			QUOTE: ['"',"'",'`'],
			OPERATOR: ['+','-','/','*','&','|','!','=','?'],
			SEPARATOR: [',',' ','\t','\n'],
			ESCAPE: ['\\'],
			OBJASSIGN: [':'],
			DOT: ['.']
		}
	)


	// HTMA parser instance setup
	const writers = (() => {

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

	const parse = htma_parser({
		tagAliases,
		tagAttributeAliases,
		commonAttributeAliases,
		attributeTransformations: instanceOptions.transformations.attributes || {},
		parse_css,
		parse_js,
	}, writers, instanceOptions.tokens || {})

	// Return instance public methods
	return {
		parse,
		template: (str, options) => args => parse(str, args, options),
		parse_css,
		parse_js,
		css_writers,
		writers,
		custom: (opts = {}) =>
			instance(mergeOptions(instanceOptions, opts)),
		add: add_component
	}
}

// Default instance with default config
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
