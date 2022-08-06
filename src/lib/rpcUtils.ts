import type { LanyardData } from 'sk-lanyard';
interface VSCodeData {
    lang?: string,
    workspace?: string,
    branch?: string,
    idling?: boolean,
}

interface Activity {
    name: string,
    start?: Date
}

export const getCodeData = (data?: LanyardData): VSCodeData | undefined => {
    const codeActivity = data?.activities.find(a => a.application_id === '782685898163617802');

    if (!codeActivity) {
        return undefined;
    }

    const idling = codeActivity.details === 'Idling';
    if (idling) {
        return {
            idling: true,
        }
    }

    const workspace = codeActivity.details.substring(3).split(' - ')[0];
    const branch = codeActivity.details.substring(3).replaceAll(/\u200b/g, '').trim().split(' - ')[1];
    const lang = codeActivity.assets.large_text?.split(' ')[2].toLocaleLowerCase();

    return {
        lang,
        workspace,
        branch,
    }
}

export const getOtherActivities = (data?: LanyardData): Activity[] | undefined => {
    const otherActivities = data?.activities.filter(a => a.application_id !== '782685898163617802' && a.type === 0);
    return otherActivities?.map(activity => ({ name: activity.name, start: activity.timestamps ? new Date(activity.timestamps.start) : undefined }));
}