import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { useUserActions, useAlertActions } from '_actions';

export { Register };

function Register({ history }) {
    const userActions = useUserActions();
    const alertActions = useAlertActions();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        sureName: Yup.string()
            .required('sure Name is required'),
        username: Yup.string()
            .required('Username is required'),
        occupation: Yup.string()
            .required('Occupation is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    function onSubmit(data) {
        return userActions.register(data)
            .then(() => {
                history.push('/account/login');
                alertActions.success('Registration successful');
            })
    }

    return (
        <div className="card m-3">
            <h4 className="card-header">Register</h4>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label>First Name</label>
                        <input name="firstName" type="text" {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.firstName?.message}</div>
                    </div>
                    <div className="form-group">
                        <label>sure Name</label>
                        <input name="sureName" type="text" {...register('sureName')} className={`form-control ${errors.sureName ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.sureName?.message}</div>
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.username?.message}</div>
                    </div>
                    <div className="form-group">
                        <label>Occupation</label>
                        <input name="occupation" type="text" {...register('occupation')} className={`form-control ${errors.occupation ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.occupation?.message}</div>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>
                    <button disabled={isSubmitting} className="btn btn-primary">
                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Register
                    </button>
                    <Link to="login" className="btn btn-link">Cancel</Link>
                </form>
            </div>
        </div>
    )
}
