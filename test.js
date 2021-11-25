
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

const debugStepper = (input, debug) => {
  const cont = document.createElement('div')
  cont.style.clear = 'both'
  let ind = 1
  const cont_text = document.createElement('pre')
  const cont_read = document.createElement('pre')
  const cont_out = document.createElement('pre')
  const btn_back = document.createElement('button')
  const btn_forth = document.createElement('button')
  const rend = () => {
    const d = debug[ind]
    cont_text.innerHTML =
      encodeEntities(input.slice(0, Math.max(0,d.index-1))) +
        (d.index > 0
          ? ('<span style="color:#fff;background:#000;" >'+
            (input[d.index-1]||'')+
          '</span>')
          : '')+
      encodeEntities(input.slice(d.index))
    cont_read.innerHTML = encodeEntities(JSON.stringify({...d.reading}, null, '  '))
  }

  btn_back.addEventListener('click', () => {
    if (ind-1 in debug)
      ind--
    rend()
  })
  btn_forth.addEventListener('click', () => {
    if (ind+1 in debug)
      ind++
    rend()
  })

  btn_back.innerHTML = "Back"
  btn_forth.innerHTML = "Forth"

  cont.appendChild(btn_back)
  cont.appendChild(btn_forth)
  cont.appendChild(cont_text)
  cont.appendChild(cont_out)
  cont.appendChild(cont_read)
  document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(cont)
  })
  rend()
}

class HTMA_Tester {
  #cases = []
  #execCase = ({ input, args, expected, desc = '', writeMode }) => {
    const log = []
    const orig_log = console.log
    console.log = (...args) => {
      log.push(args)
    }
    let debug = false
    let actual = ''
    let failure = false
    try {
      if (writeMode === 'dom') {
        actual = htma.parse(input, args, {
          writer: htma.writers.dom,
          outputString: true,
          debug: (inp, deb) => {
            debug = deb
          }
        })
      } else
      if (writeMode === 'css') {
        actual = htma.parse_css(input, args, {
          debug: (inp, deb) => {
            debug = deb
          }
        })
			} else
      {
        actual = htma.parse(input, args, {
          debug: (inp, deb) => {
            debug = deb
          }
        })
      }
    } catch(e) {
      failure = e
      console.error(e)
    }
    if (actual === expected && !failure) {
      orig_log('%cShould '+desc, 'color:#090')
    } else {
      console.error('Did not '+desc)
      console.error('EXPECT: ', expected)
      console.error('ACTUAL: ', actual)
      console.error('LOGS: ')
      log.forEach(args => orig_log(...args))
      debugStepper(input, debug)
    }
    console.log = orig_log
  }
  add(...cases) {
    this.#cases = this.#cases.concat(cases)
    return this
  }
  variate(varier) {
    this.#cases = [].concat(...this.#cases.map(varier))
    return this
  }
  exec() {
    this.#cases.forEach(this.#execCase)
    this.#cases = []
    return this
  }
}

htma.add(class TestComponent {
  static template = `
    <div.test-component>
      <var#attr>
      <for#i in:list>
        <var#i>
      <var#rettr()>`
  attr = ''
  list = []
  rettr = () => ''
})


new HTMA_Tester()
.add(
  {
    desc: "render a tag and its close tag when just the open tag is provided",
    input: `<div>`,
    args: {},
    expected: `<div></div>`
  },
  {
    desc: "render a tag that is registered as self closing without a close tag",
    input: `
    <input>
    <img>
    `,
    args: {},
    expected: `<input/><img/>`,
    expectedDOM: `<input><img>`
  },
  {
    desc: "render a tag that is written as self closing without a close tag",
    input: `<div/>`,
    args: {},
    expected: `<div/>`,
    expectedDOM: `<div></div>`
  },
  {
    desc: "render the contents of a tag inside the tag",
    input: `
    <div>
      contents here
    `,
    args: {},
    expected: `<div>contents here</div>`
  },
  {
    desc: "render the contents of a tag inside the tag even if it's the last character",
    input: `
    <div>
      contents here`,
    args: {},
    expected: `<div>contents here</div>`
  },
  {
    desc: "render two tags consecutively if they are on the same indent level",
    input: `
      <div>
      <span>
    `,
    args: {},
    expected: `<div></div><span></span>`
  },
  {
    desc: "render one tag inside another if it is at a higher indent level",
    input: `
      <div>
        <span>
    `,
    args: {},
    expected: `<div><span></span></div>`
  },
)
.add(
  {
    desc: "render the inline ID as the ID attribute",
    input: `<div#hello-id>`,
    args: {},
    expected: `<div id="hello-id"></div>`
  },
  {
    desc: "render the inline class as the class attribute",
    input: `<div.class.list.here>`,
    args: {},
    expected: `<div class="class list here"></div>`
  },
  {
    desc: "render the inline class and inline ID when provided together",
    input: `<div#id-val.class-val.another-class>`,
    args: {},
    expected: `<div id="id-val" class="class-val another-class"></div>`
  },
  {
    desc: "render the inline class as the class attribute",
    input: `<div#id-val.class-val.another-class>`,
    args: {},
    expected: `<div id="id-val" class="class-val another-class"></div>`
  },
  {
    desc: "merge the inline class and attribute class together",
    input: `<div.class-val.another-class class="additional-class yet-another-class" >`,
    args: {},
    expected: `<div class="class-val another-class additional-class yet-another-class"></div>`
  },
  {
    desc: "replace the inline ID value with the ID attribute value",
    input: `<div#id-val id="different-id" >`,
    args: {},
    expected: `<div id="different-id"></div>`
  },
  {
    desc: "render arbitrary attribute values surrounded by quotes",
    input: `<div some-attr="some complex value" anotherAttr='different quotes' >`,
    args: {},
    expected: `<div some-attr="some complex value" anotherattr="different quotes"></div>`
  },
  {
    desc: "render arbitrary attribute values without quotes",
    input: `<div some-attr=some-complex_value anotherAttr=different-quotes >`,
    args: {},
    expected: `<div some-attr="some-complex_value" anotherattr="different-quotes"></div>`
  },
  {
    desc: "renders quotes in a string that are prefixed with a backslash",
    input: `<div some-attr="some complex\\" value" >`,
    args: {},
    expected: `<div some-attr="some complex\\&quot; value"></div>`
  },
  {
    desc: "closes a string if there are an even number of backslashed before the end quote",
    input: `<div some-attr="some complex value\\\\" >`,
    args: {},
    expected: `<div some-attr="some complex value\\\\"></div>`
  },
  {
    desc: "renders characters that are escaped but not quotes normally",
    input: `<div some-attr="some complex\\h value" >`,
    args: {},
    expected: `<div some-attr="some complex\\h value"></div>`
  },
  {
    desc: "render arbitrary attribute values when they are indented",
    input: `
    <div
      atr1="attr valu"
      atr2='attr valtu'
      anotherAttr=no-quotes
    >`,
    args: {},
    expected: `<div atr1="attr valu" atr2="attr valtu" anotherattr="no-quotes"></div>`
  },
  {
    desc: "allow assignment of attributes with colons",
    input: `
    <div
      atr-name1:attr-value1
      atr-name2:"attr value2"
      atr-name3:'attr value3'
    >`,
    args: {},
    expected: `<div atr-name1="attr-value1" atr-name2="attr value2" atr-name3="attr value3"></div>`
  },
)
.add(
  {
    desc: "render content only when condition is true",
    input: `
    <if exp="true">
      good`,
    args: {},
    expected: `good`
  },
  {
    desc: "render content when condition is true and not on else",
    input: `
    <if exp="true">
      good
    <else>
      bad`,
    args: {},
    expected: `good`
  },
  {
    desc: "render content when condition is true and not when elseif is true",
    input: `
    <if exp="true">
      good
    <elseif exp=true>
      bad`,
    args: {},
    expected: `good`
  },
  {
    desc: "render content under else when main condition is false",
    input: `
    <if exp="false">
      bad
    <else>
      good`,
    args: {},
    expected: `good`
  },
  {
    desc: "render content when elseif is true and not main condition",
    input: `
    <if exp="false">
      bad
    <elseif exp=true>
      good`,
    args: {},
    expected: `good`
  },
  {
    desc: "render no content when condition and elseif are false",
    input: `
    <if exp="false">
      bad
    <elseif exp=false>
      worse`,
    args: {},
    expected: ``
  },
  {
    desc: "render else when if and elseif are false",
    input: `
    <if exp="false">
      bad
    <elseif exp=false>
      good
    <else>
      great`,
    args: {},
    expected: `great`
  },
  {
    desc: "renders an attribute in a condition",
    input: `
    <div
      <if#true>
        class=test-class
    >`,
    args: {},
    expected: `<div class="test-class"></div>`
  },
  {
    desc: "not render an attribute in a false condition",
    input: `
    <div
      <if#false>
        class=test-class
    >`,
    args: {},
    expected: `<div></div>`
  },
  {
    desc: "renders a property in a condition",
    input: `
    <div
      <if#true>
        selected
    >`,
    args: {},
    expected: `<div selected></div>`,
    expectedDOM: `<div selected=""></div>`
  },
  {
    desc: "not render a property in a false condition",
    input: `
    <div
      <if#false>
        selected
    >`,
    args: {},
    expected: `<div></div>`
  },
  {
    desc: "renders multiple attributes in a condition",
    input: `
    <div
      <if#true>
        attr1=val1
        attr2=val2
    >`,
    args: {},
    expected: `<div attr1="val1" attr2="val2"></div>`
  },
  {
    desc: "not render attributes in an else",
    input: `
    <div
      <if#true>
        attr1=val1
      <else>
        attr2=val2
    >`,
    args: {},
    expected: `<div attr1="val1"></div>`
  },
  {
    desc: "render attributes in an else where the main condition is false",
    input: `
    <div
      <if#false>
        attr1=val1
      <else>
        attr2=val2
    >`,
    args: {},
    expected: `<div attr2="val2"></div>`
  },
  {
    desc: "render attributes in an elseis where the main condition is false and elseif is true",
    input: `
    <div
      <if#false>
        attr1=val1
      <elseif#true>
        attr2=val2
    >`,
    args: {},
    expected: `<div attr2="val2"></div>`
  },
  {
    desc: "not render attributes in an elseif where the main condition is false and the elseif is false",
    input: `
    <div
      <if#false>
        attr1=val1
      <elseif#false>
        attr2=val2
    >`,
    args: {},
    expected: `<div></div>`
  },
  {
    desc: "render attributes in an else where the main condition and the elseif are false",
    input: `
    <div
      <if#false>
        attr1=val1
      <elseif#false>
        attr2=val2
      <else>
        attr3=val3
    >`,
    args: {},
    expected: `<div attr3="val3"></div>`
  },
  {
    desc: "render attributes after a property that ends the line",
    input: `
    <div.class-one random-attrname
      onclick="1234"
      title="5678"
    >`,
    expected: `<div class="class-one" random-attrname onclick="1234" title="5678"></div>`,
    expectedDOM: `<div class="class-one" random-attrname="" onclick="1234" title="5678"></div>`
  },
  {
    desc: "render attributes after a conditional attribute",
    input: `
    <div.instruments-instrument
      <if#true>
        stand-alone
      data-attr=attr-val
    >`,
    expected: `<div class="instruments-instrument" stand-alone data-attr="attr-val"></div>`,
    expectedDOM: `<div class="instruments-instrument" stand-alone="" data-attr="attr-val"></div>`
  },
  {
    desc: "render attributes after a false conditional attribute",
    input: `
    <div.instruments-instrument
      <if#false>
        stand-alone
      data-attr=attr-val
    >`,
    expected: `<div class="instruments-instrument" data-attr="attr-val"></div>`
  },
  {
    desc: "renders all members of an object as attributes of a tag",
    input: `
    <div
      <args#test>
    >`,
    expected: `<div a="1234" b="hello" some_attr="some val"></div>`,
    args: {test:{a:1234,b:'hello',some_attr:'some val'}}
  },
  {
    desc: "renders all members of an object as attributes of a tag if it's the last thing in the tag",
    input: `
    <div <args#test>>`,
    expected: `<div a="1234" b="hello" some_attr="some val"></div>`,
    args: {test:{a:1234,b:'hello',some_attr:'some val'}}
  },
  {
    desc: "renders all members of the properties as attributes of a tag",
    input: `
    <div <args>>`,
    expected: `<div a="1234" b="hello" some_attr="some val"></div>`,
    args: {a:1234,b:'hello',some_attr:'some val'}
  },
  {
    desc: "allow other quotes to exist inside quotes",
    input: `<div test="some complex'value with sub strings' hello">`,
    expected: `<div test="some complex&apos;value with sub strings&apos; hello"></div>`,
    expectedDOM: `<div test="some complex'value with sub strings' hello"></div>`
  },
  {
    desc: "allow quotes to exist inside tags inside quotes",
    input: `<div test="<var exp="'subval'" >">`,
    expected: `<div test="subval"></div>`
  },
  {
    desc: "allow broken tags (spaces) to exist inside values",
    input: `<div test=<var exp="'subval'" > >`,
    expected: `<div test="subval"></div>`
  },
  {
    desc: "render any array attribute like classes",
    input: `<selectinput value=sin options='<var exp=["sin","square","saw","triangle","line"] >' label=Form >`,
    expected: `<selectinput value="sin" options="sin square saw triangle line" label="Form"></selectinput>`
  },
  {
    desc: "render attributes after a falsey attribute condition that ends by printing a var",
    input: `
    <select.select-input-select
      <if#name>
        name=<var#name>
      onchange=<var#test>
    >`,
    expected:`<select class="select-input-select" onchange="4"></select>`,
    args: {test:4,name:0}
  },
  {
    desc: "render attributes after a true attribute condition that ends by printing a var",
    input: `
    <select.select-input-select
      <if#name>
        name=<var#name>
      onchange=<var#test>
    >`,
    expected:`<select class="select-input-select" name="1" onchange="4"></select>`,
    args: {test:4,name:1}
  },
  {
    desc: "render atrributes below conditions but in other tags",
    input: `
    <div.step >
      <div.step-volume>
        <if#false>
          <span>
            hello
        <dial-input
          attr1=testy
        >`,
    expected: `<div class="step"><div class="step-volume"><dial-input attr1="testy"></dial-input></div></div>`
  }
)
.add(
  {
    desc: "render a variable passed in to the args",
    input: `<var#test>`,
    args: {
      test: 'hello'
    },
    expected: `hello`
  },
  {
    desc: "render a nested variable passed in to the args",
    input: `<var#obj.sub.test>`,
    args: {
      obj: {
        sub: {
          test: 'hello'
        }
      }
    },
    expected: `hello`
  },
  {
    desc: "render an expression composed of variables passed in to the args",
    input: `<var exp="test+test2">`,
    args: {
      test: 'hello',
      test2: 'helloagain'
    },
    expected: `hellohelloagain`
  },
  {
    desc: "render two variables passed in to the args",
    input: `<var#test><var#test2>`,
    args: {
      test: 'hello',
      test2: 'helloagain'
    },
    expected: `hellohelloagain`
  },
  {
    desc: "render variables in between content",
    input: `con <var#test> ten <var#test2> t`,
    args: {
      test: 'hello',
      test2: 'helloagain'
    },
    expected: `con hello ten helloagain t`
  },
  {
    desc: "render variables in attribute values",
    input: `<div attr="<var#test>">`,
    args: {
      test: 'hello',
    },
    expected: `<div attr="hello"></div>`
  },
  {
    desc: "render variables as part or more complex attribute values",
    input: `<div attr="comp<var#test>lex">`,
    args: {
      test: 'hello',
    },
    expected: `<div attr="comphellolex"></div>`
  },
  {
    desc: "render variables as attribute names",
    input: `<div <var#test>="value">`,
    args: {
      test: 'hello',
    },
    expected: `<div hello="value"></div>`
  }
)
.add(
  {
    desc: "not evaluate a variable inside a false condition",
    input: `
    <if#false>
      <var#somevar.doesnt.exist>
    `,
    args: {},
    expected: ``
  },
  {
    desc: "not evaluate sub-conditions of a false condition",
    input: `
    <if#false>
      <if#somevar.doesnt.exist>
        never
    `,
    args: {},
    expected: ``
  },
  {
    desc: "not evaluate a variable inside the else of a true condition",
    input: `
    <if#true>
      good
    <else>
      <var#somevar.doesnt.exist>
    `,
    args: {},
    expected: `good`
  },
  {
    desc: "not evaluate sub-conditions inside the else of a true condition",
    input: `
    <if#true>
      good
    <else>
      <if#somevar.doesnt.exist>
        never
    `,
    args: {},
    expected: `good`
  },
  {
    desc: "not evaluate a variable inside the elseif of a true condition",
    input: `
    <if#true>
      good
    <elseif#true>
      <var#somevar.doesnt.exist>
    `,
    args: {},
    expected: `good`
  },
)
.add(
  {
    desc: "run a for loop on a given variable",
    input: `
    <for#a in="set" >
      <var#a>
    `,
    args: {
      set: [1,2,3]
    },
    expected: `123`
  },
  {
    desc: "run a for loop on a given variable with a key",
    input: `
    <for#a key=b in="set" >
      <var#a><var#b>
    `,
    args: {
      set: [1,2,3]
    },
    expected: `102132`
  },
  {
    desc: "run a for loop on a given variable if it's the last thing in the input",
    input: `
    <for#a in="set" >
      <var#a>`,
    args: {
      set: [1,2,3]
    },
    expected: `123`
  },
  {
    desc: "run a for loop on an evaluated structure",
    input: `
    <for#a in="['a','b','c']" >
      <var#a>
    `,
    args: {},
    expected: `abc`
  },
  {
    desc: "run a for loop on an object",
    input: `
    <for#a in="{'a':1,'b':2,'c':3}" >
      <var#a>
    `,
    args: {},
    expected: `123`
  },
  {
    desc: "run a for loop with a key on an object",
    input: `
    <for#a key="b" in="{'a':1,'b':2,'c':3}" >
      <var#a><var#b>
    `,
    args: {},
    expected: `1a2b3c`
  },
  {
    desc: "run a for loop on a range defined by the end",
    input: `
    <for#a to=3 >
      <var#a>
    `,
    args: {},
    expected: `012`
  },
  {
    desc: "run a for loop on a range defined by the start and end",
    input: `
    <for#a from=2 to=6 >
      <var#a>
    `,
    args: {},
    expected: `2345`
  },
  {
    desc: "run a for loop on a range defined by the start, end and increment",
    input: `
    <for#a from=2 to=7 inc=2 >
      <var#a>
    `,
    args: {},
    expected: `246`
  },
  {
    desc: "run a for loop on a range defined by the end and increment",
    input: `
    <for#a to=7 inc=2 >
      <var#a>
    `,
    args: {},
    expected: `0246`
  },
  {
    desc: "render content in a for loop",
    input: `
    <for#a in="set" >
      a<var#a>
    `,
    args: {
      set: [1,2,3]
    },
    expected: `a1a2a3`
  },
)
// .add(
// 	{
// 		input: `<div pos="top; left; right:5%+10;" >`,
// 		expected: `<div style="top:0;left:0;right:calc(5%+10px)"></div>`
// 	}
// )
.add(
  {
    desc: `render a component`,
    input: `<TestComponent>`,
    expected: `<div class="test-component"></div>`
  },
  {
    desc: `pass attributes through to the component and use them properly`,
    input: `<TestComponent attr=testing >`,
    expected: `<div class="test-component">testing</div>`
  },
  {
    desc: `pass attributes as variables through to the component and use them properly`,
    input: `<TestComponent list=<var#items> rettr=<var#getterFunc> >`,
    expected: `<div class="test-component">hihohehagotten</div>`,
    args: {
      items: ['hi','ho','he','ha'],
      getterFunc: () => 'gotten'
    }
  },
  {
    desc: "render a component in a complex situation",
    input: `
    <div.step >
      <div.step-volume>
        <if#false>
          <span>
            hello
        <dial-input>
      <div.step-form >
        <TestComponent
          attr="hello"
        >
        <div.hello>`,
    expected: `<div class="step"><div class="step-volume"><dial-input></dial-input></div><div class="step-form"><div class="test-component">hello</div><div class="hello"></div></div></div>`
  },
)
.add(
  {
    input: `
      <label class="select-input" >
        <if exp="var && obj" >
          <span.form-label >
            <var#obj.test[var]>
          <span>
            test
        <span>
          Outside
      `,
    args: {
      var: 123,
      obj: { test: { '123': 'hi' } }
    },
    expected: `<label class="select-input"><span class="form-label">hi</span><span>test</span><span>Outside</span></label>`
  },
  {
    input: `
      <label class="select-input" >
        <if exp="false" >
          <span.form-label >
            <var#obj.test[var]>
          <div>
            test
        <elseif exp="true" >
          <span>
            toast
        <span>
          Outside
      `,
    args: {
      var: 123,
      obj: { test: { '123': 'hi' } }
    },
    expected: `<label class="select-input"><span>toast</span><span>Outside</span></label>`
  },
  {
    input: `
      <label class="select-input" >
        <if exp="false" >
          <span.form-label >
            <var#obj.test[var]>
          <div>
            test
        <elseif exp="false" >
          <span>
            toast
        <else>
          finally
        <span>
          Outside
      `,
    args: {
      var: 123,
      obj: { test: { '123': 'hi' } }
    },
    expected: `<label class="select-input">finally<span>Outside</span></label>`
  },
  {
    input: `
      <label class="select-input" >
        <if exp="false" >
          <span.form-label >
            <var#obj.test[var]>
          <if exp="true">
            <div>
              lest
          <else>
            <div>
              toast
        <else>
          <div>
            test
      `,
    args: {
      var: 123,
      obj: { test: { '123': 'hi' } }
    },
    expected: `<label class="select-input"><div>test</div></label>`
  },
  {
    input: `
      <div>
        <for#thing in="things">
          <if exp="thing != 'hello'">
            <div>
              <var#thing>
        <div>
          hehe
      `,
    args: {
      things:['hi','ho','hello','hey']
    },
    expected: `<div><div>hi</div><div>ho</div><div>hey</div><div>hehe</div></div>`
  },
  {
    input: `
      <for#l in="list">
        <var#l>
      <div class="<var#class>">
      <div
        <if exp="class">
          <if exp="class">
            class="class"
      >
      `,
    args: {
      list:[1,2,3,4],
      class: 5678
    },
    expected: `1234<div class="5678"></div><div class="class"></div>`
  },
  {
    input: `
    <div
      class="dial-input-increment"
      style="transform:rotate(<var exp=a+b >deg);"
    >`,
    args: {a:1,b:3},
    expected: `<div class="dial-input-increment" style="transform:rotate(4deg);"></div>`
  }
)

/*
.variate((testcase) => [
  {...testcase,writeMode:'string'},
  {...testcase,writeMode:'dom',desc:(testcase.desc||'')+' DOM',...(testcase.expectedDOM ? {expected:testcase.expectedDOM} : {})},
])
//*/
/*
.variate((testcase) => {
  const variations = [
    {
      name: "Extra nesting",
      startInput:`
<article>
  <section>
`,
      startExpected:"<article><section>",
      endExpected:"</section></article>",
      increaseIndent: 4,
    },
    {
      name: "Conditional nesting - true",
      startInput:`
<if exp=true >
  <if exp=true >
`,
      increaseIndent: 4,
    },
    {
      name: "Conditional nesting - false 1",
      startInput:`
<if exp=false >
  <if exp=true >
`,
      increaseIndent: 4,
      expectedOverride: () => ''
    },
    {
      name: "Conditional nesting - false 2",
      startInput:`
<if exp=true >
  <if exp=false >
`,
      increaseIndent: 4,
      expectedOverride: () => ''
    },
    {
      name: "Random siblings",
      endInput:`
<article>
<section>
`,
      endExpected:"<article></article><section></section>",
    },
  ]
  return [
    testcase,
    ...variations.map((variation, i) => ({
      ...testcase,
      desc: (testcase.desc || '')+` (variation: ${variation.name || (i+1)})`,
      input:
        (variation.startInput || '')+
        (variation.inputOverride
          ? variation.inputOverride(testcase.input)
          : testcase.input)
          .split('\n')
          .map(s => ' '.repeat(variation.increaseIndent || 0)+s)
          .join('\n')+
        (variation.endInput || ''),
      expected: (variation.startExpected || '')+(variation.expectedOverride ? variation.expectedOverride(testcase.expected) : testcase.expected)+(variation.endExpected || '')
    }))
  ]
})
//*/
.add(
	{
		desc: "convert mathematical expressions to calc functions",
		writeMode: 'css',
		input: `right:5%+10;`,
		expected: `right:calc(5% + 10px);`
	},
	{
		desc: "convert mathematical expressions to calc functions if they are the last thing in the string",
		writeMode: 'css',
		input: `right:5%+10`,
		expected: `right:calc(5% + 10px);`
	},
	{
		desc: "convert mathematical expressions with arbitrary whitespace to calc functions",
		writeMode: 'css',
		input: ` right : 5% + 10 `,
		expected: `right:calc(5% + 10px);`
	},
	{
		desc: "not convert single values to calc functions",
		writeMode: 'css',
		input: `right:5%`,
		expected: `right:5%;`
	},
	{
		desc: "fill in units for standalone values",
		writeMode: 'css',
		input: `right:5`,
		expected: `right:5px;`
	},
	{
		desc: "convert mathematical expressions with brackets to calc functions",
		writeMode: 'css',
		input: `right:(5%+10)-(8em+4)`,
		expected: `right:calc((5% + 10px) - (8em + 4px));`
	},
	{
		desc: "convert mathematical expressions with brackets ending with no units to calc functions",
		writeMode: 'css',
		input: `right:(5+10)-(8+4)`,
		expected: `right:calc((5px + 10px) - (8px + 4px));`
	},
	{
		desc: "convert mathematical expressions with brackets ending with units to calc functions",
		writeMode: 'css',
		input: `right:(5%+10px)-(8em+4px)`,
		expected: `right:calc((5% + 10px) - (8em + 4px));`
	},
	{
		desc: "avoid converting string values",
		writeMode: 'css',
		input: `top:auto;`,
		expected: `top:auto;`
	},
	{
		desc: "avoid converting string values with arbitrary whitespace",
		writeMode: 'css',
		input: ` top : auto ;`,
		expected: `top:auto;`
	},
	{
		desc: "fill in no-value properties with their defaults",
		writeMode: 'css',
		input: `top`,
		expected: `top:0;`
	},
	{
		desc: "ignore nonsensical properties",
		writeMode: 'css',
		input: `dthdhsd`,
		expected: ``
	}
)
.exec()
