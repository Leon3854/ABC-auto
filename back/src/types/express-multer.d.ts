import * as multer from 'multer'

declare global {
	namespace Express {
		interface Request {
			file?: multer.File // Добавьте это, если вы используете single file upload
			// files?: multer.File[] // Добавьте это, если вы используете multiple files upload
		}
	}
}
