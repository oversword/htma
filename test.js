 




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
  #execCase = ({ input, args, expected, desc = '' }) => {
    const log = []
    const orig_log = console.log
    console.log = (...args) => {
      log.push(args)
    }
    let debug = false
    let actual = ''
    let failure = false
    try {
      actual = htma(input, args, {
        debug: (inp, deb) => {
          debug = deb
        }
      })
      // actual = htma(input, args, {
      //   writer: dom_writer,
      //   outputString: true,
      //   debug: (inp, deb) => {
      //     debug = deb
      //   }
      // })
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




new HTMA_Tester()
.add(
  {
    desc: "render a tag and its close tag when just the open tag is provided",
    input: `<div>`,
    args: {},
    expected: `<div></div>`
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
    expected: `<div class="class-val another-class" id="id-val"></div>`
  },
  {
    desc: "render the inline class as the class attribute",
    input: `<div#id-val.class-val.another-class>`,
    args: {},
    expected: `<div class="class-val another-class" id="id-val"></div>`
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
    desc: "render arbitraty attribute values surrounded by quotes",
    input: `<div some-attr="some complex value" anotherAttr='different quotes' >`,
    args: {},
    expected: `<div some-attr="some complex value" anotherattr="different quotes"></div>`
  },
  {
    desc: "render arbitraty attribute values without quotes",
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
    desc: "render arbitraty attribute values when they are indented",
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
)
/*
.variate((testcase) => {
  // const mindent = (testcase.input.match(/^([ \t]+)(?=[^\s])/gmi) || [''])
  //   .reduce((curr, next) =>
  //     (curr === false || next.length < curr.length) ? next : curr, false).length

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
.exec()
