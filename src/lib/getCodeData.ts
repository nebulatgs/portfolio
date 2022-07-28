import type { useLanyard } from 'svelte-lanyard';
import type { Readable } from 'svelte/store';
type ExtractData<Type> = Type extends Readable<infer X> ? X : never
interface VSCodeData {
    lang?: string,
    workspace?: string,
    branch?: string,
    idling?: boolean,
}
export const getCodeData = (data: ExtractData<ReturnType<typeof useLanyard>>): VSCodeData | undefined => {
    const codeActivity = data?.activities?.find?.(a => a.type === 0);

    if (!codeActivity) {
        return undefined;
    }

    const idling = codeActivity?.details === 'Idling';
    if (idling) {
        return {
            idling: true,
        }
    }

    const workspace = codeActivity.details?.substring(3).split(' - ')[0];
    const branch = codeActivity.details?.substring(3).split(' - ')[1];
    const lang = codeActivity.assets?.large_text?.split(' ')[2]?.toLocaleLowerCase();

    return {
        lang,
        workspace,
        branch,
    }
}