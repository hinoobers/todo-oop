import fs from "node:fs/promises"

class FileManager {
    async writeFile(filename, data) {
        try {
            data = JSON.stringify(data, null, 2)
            await fs.writeFile(filename, data)
        } catch(error) {
            console.log("error => ", error)
        }
    }

    async readFile(filename) {
        try {
            const content = await fs.readFile(filename, 'utf8')
            return JSON.parse(content)
        } catch(error) {
            console.log("error => ", error)
        }
    }
}

export const fileManager = new FileManager();