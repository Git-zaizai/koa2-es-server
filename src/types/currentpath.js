import { fileURLToPath } from 'url'
import { dirname } from 'path'

export default currentpath => {
	const __filename = fileURLToPath(currentpath)
	const __dirname = dirname(__filename)
	return { __filename, __dirname }
}
