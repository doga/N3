import Lexer from './lib/N3Lexer.mjs'
import Parser from './lib/N3Parser.mjs'
import Writer from './lib/N3Writer.mjs'
import Store from './lib/N3Store.mjs'
import StreamParser from './lib/N3StreamParser.mjs'
import StreamWriter from './lib/N3StreamWriter.mjs'
import * as Util from './lib/N3Util.mjs'

import {
  default as DataFactory,

  Term,
  NamedNode,
  Literal,
  BlankNode,
  Variable,
  DefaultGraph,
  Quad,
  Triple,

  termFromId,
  termToId,
} from './lib/N3DataFactory.mjs';

// Named exports
export {
  Lexer,
  Parser,
  Writer,
  Store,
  StreamParser,
  StreamWriter,
  Util,

  DataFactory,

  Term,
  NamedNode,
  Literal,
  BlankNode,
  Variable,
  DefaultGraph,
  Quad,
  Triple,

  termFromId,
  termToId,
};

// Export all named exports as a default object for backward compatibility
export default {
  Lexer,
  Parser,
  Writer,
  Store,
  StreamParser,
  StreamWriter,
  Util,

  DataFactory,

  Term,
  NamedNode,
  Literal,
  BlankNode,
  Variable,
  DefaultGraph,
  Quad,
  Triple,

  termFromId,
  termToId,
};
