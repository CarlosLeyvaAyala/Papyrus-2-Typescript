/*
This file was manually created.

It adds functions that are only possible in Typescript.

Some of these were made to deal with current SP limitations at 
the moment of writing this, like array returning types from 
SKSE functions not working.

Others were made just for plain convenience.

This file will be included in the official conversion release 
once it has a good deal of useful functions.
*/
import * as JMap from "./JMap"
import * as JFormMap from "./JFormMap"
import { Form } from "skyrimPlatform"

/** JMap related functions. */
export namespace JMapL {
  /** Iterates over all JMap keys and executes a function `f` for each key.
   *
   * @param o Object handle for the JMap.
   * @param f Function to execute for each key found.
   * It accepts the `key` found and the object `o` as arguments.
   *
   * @example
   * ForAllKeys(JValue.readFromFile(path), (armor, i) => {
   *   const data = JMap.getObj(i, armor)
   *   DoSomething(data)
   * })
   */
  export function ForAllKeys(
    o: number,
    f: (key: string, object: number) => void
  ) {
    if (o === 0) return
    let k = JMap.nextKey(o)

    while (k !== "") {
      f(k, o)
      k = JMap.nextKey(o, k)
    }
  }
}

export namespace JFormMapL {
  /** Iterates over all JFormMap keys and executes a function `f` for each key.
   *
   * @param o Object handle for the JFormMap.
   * @param f Function to execute for each key found.
   * It accepts the `key` found and the object `o` as arguments.
   *
   * @example
   * ForAllKeys(JValue.readFromFile(path), (armor, i) => {
   *   const data = JFormMap.getObj(i, armor)
   *   DoSomething(data)
   * })
   */
  export function ForAllKeys(
    o: number,
    f: (key: Form, object: number) => void
  ) {
    if (o === 0) return
    let k = JFormMap.nextKey(o)

    while (k) {
      f(k, o)
      k = JFormMap.nextKey(o, k)
    }
  }
}
