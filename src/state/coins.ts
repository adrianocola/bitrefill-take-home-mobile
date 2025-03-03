import {atom, useAtomValue, useSetAtom} from 'jotai';

const resetCoinsList = atom(0);

export const useResetCoinsList = () => useAtomValue(resetCoinsList);
export const useSetResetCoinsList = () => useSetAtom(resetCoinsList);
