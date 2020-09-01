import validate from "validate.js"


const constraints = {
    username: {
      presence: {
        allowEmpty :false,
        message: "is required."
      },
      length : {
          minimum : 6,
          message : "must be at least 6 characters."
      }
    },
    password: {
      presence: {
        allowEmpty : false,
        message: "is required."
      },
      length: {
        minimum: 8,
        message: "must be at least 8 characters."
      }
    },


    title: {
      presence: {
        allowEmpty : false,
        message: "is required."
      }
    },

    description: {
      presence: {
        allowEmpty : false,
        message: "is required."
      }
    },
    imagenote : {
      presence : {
        allowEmpty : false,
        message : 'is required'
      }
    }
  }

export default function validationWrapper(fieldName, value) {
    // Validate.js validates your values as an object
    // e.g. var form = {email: 'email@example.com'}
    // Line 8-9 creates an object based on the field name and field value
    var formValues = {}
    formValues[fieldName] = value
  
    // Line 13-14 creates an temporary form with the validation fields
    // e.g. var formFields = {
    //                        email: {
    //                         presence: {
    //                          message: 'Email is blank'
    //                         }
    //                       }
    var formFields = {}
    formFields[fieldName] = constraints[fieldName]
  
    
    // The formValues and validated against the formFields
    // the variable result hold the error messages of the field
    const result = validate(formValues, formFields)
  
    // If there is an error message, return it!
    if (result) {
      // Return only the field error message if there are multiple
      return result[fieldName][0]
    }
  
    return ''
  }