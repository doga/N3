import Lexer from './N3Lexer.mjs'
import Parser from './N3Parser.mjs'
import Writer from './N3Writer.mjs'
import Store from './N3Store.mjs'
import StreamParser from './N3StreamParser.mjs'
import StreamWriter from './N3StreamWriter.mjs'
import * as Util from './N3Util.mjs'

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
} from './N3DataFactory.mjs';

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
