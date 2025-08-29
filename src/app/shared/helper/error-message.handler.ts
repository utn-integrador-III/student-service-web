/**
 * Manage the error response for http
 * @param {any | HttpErrorResponse} error 
 * @returns formatted error message string
 */
export const error_message_handler = (error_response: any): string =>  {
    let error_msg = 'An error occurred during the request'
    try {
        if ('error' in error_response && 'message_code' in error_response.error) {
            if (error_response.error.message_code instanceof Object) {
                let keys = Object.keys(error_response.error.message_code)
                error_msg = `${keys[0]}: ${error_response.error.message_code[keys[0]]}` 
            }else{
                error_msg = error_response.error.message_code
            }
        }
        return error_msg

    }catch{
        return error_msg
    }
}