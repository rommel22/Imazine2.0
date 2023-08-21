import TimeAgo from 'javascript-time-ago'
import id from 'javascript-time-ago/locale/id'

export const useDatetimeConverter = () => {
    const convertDatetime = (datetimeString: string) => {
        TimeAgo.addDefaultLocale(id)

        const timeAgo = new TimeAgo('id-ID')
        return timeAgo.format(new Date(datetimeString))
    };
    return { 
        convertDatetime 
    };
}