import React from 'react'
import InputMask from 'react-input-mask';

export default props => (
        <div className="form-group has-feedback">
            <InputMask {...props.input}
                mask={props.mask}
                maskChar=" "
                className="form-control"
                placeholder={props.placeholder}
                readOnly={props.readOnly}
                type={props.type}
                required={props.required}
                maxLength={props.maxLength}
                minLength={props.minLength}
            />

            <span className={`glyphicon glyphicon-${props.icon} form-control-feedback`}></span>

        </div>
)

