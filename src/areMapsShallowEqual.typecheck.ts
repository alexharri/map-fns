import areMapsShallowEqual from "./areMapsShallowEqual";

areMapsShallowEqual({}, {});

// @ts-expect-error
areMapsShallowEqual({});

/* It returns an error if maps with different keys are compared */

{
  const a = { x: 1 };
  const b = { y: 2 };

  // @ts-expect-error
  areMapsShallowEqual(a, b);
}

/* Unless they are properly typed */

{
  const a: Record<string, number> = { x: 1 };
  const b: Record<string, number> = { y: 2 };

  areMapsShallowEqual(a, b);
}
