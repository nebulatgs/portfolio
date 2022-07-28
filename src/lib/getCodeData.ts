import type { useLanyard } from 'svelte-lanyard';
import type { Readable } from 'svelte/store';
type ExtractData<Type> = Type extends Readable<infer X> ? X : never
interface VSCodeData {
    lang?: string,
    workspace?: string,
    branch?: string,
}
export const getCodeData = (data: ExtractData<ReturnType<typeof useLanyard>>): VSCodeData | undefined => {
    const isCode = data?.activities?.[0].name === 'Code';
    if (!isCode) {
        return undefined;
    }

    const workspace = data?.activities?.[0].details?.substring(3).split(' - ')[0];
    const branch = data?.activities?.[0].details?.substring(3).split(' - ')[1];
    const lang = data?.activities?.[0].assets?.large_text?.split(' ')[2].toLocaleLowerCase();

    return {
        lang,
        workspace,
        branch,
    }
}