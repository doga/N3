# N3

The N3 library is an implementation of the [RDF.js low-level specification](http://rdf.js.org/) that lets you handle [RDF](https://www.w3.org/TR/rdf-primer/) in JavaScript easily.
It offers:

- **Parsing** triples/quads from
  [Turtle](https://www.w3.org/TR/turtle/),
  [TriG](https://www.w3.org/TR/trig/),
  [N-Triples](https://www.w3.org/TR/n-triples/),
  [N-Quads](https://www.w3.org/TR/n-quads/),
  [RDF*](https://blog.liu.se/olafhartig/2019/01/10/position-statement-rdf-star-and-sparql-star/)
  and [Notation3 (N3)](https://www.w3.org/TeamSubmission/n3/)
- **Writing** triples/quads to
  [Turtle](https://www.w3.org/TR/turtle/),
  [TriG](https://www.w3.org/TR/trig/),
  [N-Triples](https://www.w3.org/TR/n-triples/),
  [N-Quads](https://www.w3.org/TR/n-quads/)
  and [RDF*](https://blog.liu.se/olafhartig/2019/01/10/position-statement-rdf-star-and-sparql-star/)
- **Storage** of triples/quads in memory

## Usage examples

_Tip (requires Deno): Run the following examples by typing this in your terminal:_

```shell
deno run \
  --allow-net --allow-run --allow-env --allow-read \
  https://deno.land/x/mdrb@2.0.0/mod.ts \
  https://raw.githubusercontent.com/doga/N3/main/README.md
```

<details data-mdrb>
<summary>Create an RDF quad in-memory, and print out its details.</summary>

<pre>
description = '''
Running this example is safe, it will not read or write anything to your filesystem.
'''
</pre>
</details>

```javascript
import * as N3 from 'https://esm.sh/gh/doga/N3@1.18.1/mod.mjs';
const
{ DataFactory } = N3,
{ namedNode, literal, defaultGraph, quad } = DataFactory,
myQuad = quad(
  namedNode('https://person.example/#me'),          // Subject
  namedNode('http://xmlns.com/foaf/0.1/givenName'), // Predicate
  literal('Xyz', 'en'),                             // Object
  defaultGraph(),                                   // Graph
);
console.info(myQuad.termType);              // Quad
console.info(myQuad.value);                 // ''
console.info(myQuad.subject.value);         // https://person.example/#me
console.info(myQuad.object.value);          // Xyz
console.info(myQuad.object.datatype.value); // http://www.w3.org/1999/02/22-rdf-syntax-ns#langString
console.info(myQuad.object.language);       // en
```

Output for the code above:

```text
Quad

https://person.example/#me
Xyz
http://www.w3.org/1999/02/22-rdf-syntax-ns#langString
en
```

<details data-mdrb>
<summary>Read an RDF document from string.</summary>

<pre>
description = '''
Running this example is safe, it will not read or write anything to your filesystem.
'''
</pre>
</details>

```javascript
import * as N3 from 'https://esm.sh/gh/doga/N3@1.18.1/mod.mjs';
const 
parser = new N3.Parser(),
document = `
PREFIX c: <http://example.org/cartoons#>
c:Tom a c:Cat.
c:Jerry 
  a c:Mouse;
  c:smarterThan c:Tom.`
;
parser.parse(
  document,
  (error, quad, prefixes) => {
    if (quad)
      console.info('Reading quad:\n', quad);
    else
      console.info(`Finished reading the RDF document.\nPrefixes used were: ${JSON.stringify(prefixes)}`);
  }
);
```

Output for the code above:

```text
Reading quad:
 P {
  id: "",
  _subject: O { id: "http://example.org/cartoons#Tom" },
  _predicate: O { id: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type" },
  _object: O { id: "http://example.org/cartoons#Cat" },
  _graph: B { id: "" }
}
Reading quad:
 P {
  id: "",
  _subject: O { id: "http://example.org/cartoons#Jerry" },
  _predicate: O { id: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type" },
  _object: O { id: "http://example.org/cartoons#Mouse" },
  _graph: B { id: "" }
}
Reading quad:
 P {
  id: "",
  _subject: O { id: "http://example.org/cartoons#Jerry" },
  _predicate: O { id: "http://example.org/cartoons#smarterThan" },
  _object: O { id: "http://example.org/cartoons#Tom" },
  _graph: B { id: "" }
}
Finished reading the RDF document.
Prefixes used were: {"c":"http://example.org/cartoons#"}
```

<details data-mdrb>
<summary>Create RDF quads in-memory and store them in an in-memory RDF store.</summary>

<pre>
description = '''
Running this example is safe, it will not read or write anything to your filesystem.
'''
</pre>
</details>

```javascript
import * as N3 from 'https://esm.sh/gh/doga/N3@1.18.1/mod.mjs';
const 
{ DataFactory } = N3,
{ namedNode, literal, defaultGraph, quad } = DataFactory,
store = new N3.Store();
store.add(
  quad(
    namedNode('http://ex.org/Pluto'),
    namedNode('http://ex.org/type'),
    namedNode('http://ex.org/Dog')
  )
);
store.add(
  quad(
    namedNode('http://ex.org/Mickey'),
    namedNode('http://ex.org/type'),
    namedNode('http://ex.org/Mouse')
  )
);

// Retrieve all quads
for (const quad of store)
  console.log(quad);
// Retrieve Mickey's quads
for (const quad of store.match(namedNode('http://ex.org/Mickey'), null, null))
  console.log(quad);
```

Output for the code above:

```text
P {
  id: "",
  _subject: O { id: "http://ex.org/Pluto" },
  _predicate: O { id: "http://ex.org/type" },
  _object: O { id: "http://ex.org/Dog" },
  _graph: B { id: "" }
}
P {
  id: "",
  _subject: O { id: "http://ex.org/Mickey" },
  _predicate: O { id: "http://ex.org/type" },
  _object: O { id: "http://ex.org/Mouse" },
  _graph: B { id: "" }
}
P {
  id: "",
  _subject: O { id: "http://ex.org/Mickey" },
  _predicate: O { id: "http://ex.org/type" },
  _object: O { id: "http://ex.org/Mouse" },
  _graph: B { id: "" }
}
```

## Forked

This is a fork of [dfjs/N3.js](https://github.com/rdfjs/N3.js).

∎
