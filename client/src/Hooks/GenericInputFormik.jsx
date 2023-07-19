import { useField } from "formik";

    // INPUT COMPONENT
   export const MyTextInput = ({ label, ...props }) => {
        const [field, meta] = useField(props);
        const errorClass = meta.touched && meta.error ? 'is-danger' : 'is-info';

        return (
            <>
                <div className={`${props.id} field`}>
                    <div className='control'>
                        {props.name !== 'description' && props.name !== 'opinion' ?
                            <input
                                className={`${errorClass} input`}
                                style={{fontSize:'1.1rem'}}
                                {...field}
                                {...props}
                                >
                            </input> :
                            <textarea
                                className={`${errorClass} textarea is-small`}
                                style={{borderRadius:'4px', fontSize:'1.1rem'}}
                                {...field}
                                {...props}
                            >
                            </textarea>}
                    </div>
                {meta.touched && meta.error ? (<div className='help is-danger' style={{position:'absolute', margin:'0'}}>{meta.error}</div>) : null}
                </div>
            </>
        )
    }