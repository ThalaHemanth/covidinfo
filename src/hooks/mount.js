import { useEffect, useRef } from 'react';

/*
    On First render isMounted will be true because the effects wont run on first render. it directly
    goes to the return function.

    After return function the effects run and it has no dependence i.e(in []) so the isMounted will be
    false for the rest of the renders.
 */

export default function useDidMount() {
  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = false;
  }, []);
  return isMounted.current;
}
