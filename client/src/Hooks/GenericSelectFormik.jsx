import { useField } from "formik";

    //SELECT COMPONENT
   export const MySelect = ({ label, ...props }) => {
        const [field, meta] = useField(props);
        const errorClass = meta.touched && meta.error ? 'is-danger' : '';

        return (
            <div className='field'>
                <div className="control">
                    <div className={`${errorClass} ${props.id} select`}>
                        <select {...field} {...props} />
                    </div>
                </div>
                {meta.touched && meta.error ? (<p className='help is-danger'>{meta.error}</p>) : null}
            </div>
        );
    };
