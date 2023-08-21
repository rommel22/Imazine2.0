import MarkdownIt from 'markdown-it'

export default defineNuxtPlugin(() => {
    return {
        provide: {
            MarkdownIt
        }
    }
})