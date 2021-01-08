import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import formData from './loginForm.data.json';
import Layout from '../../../core/Layout.hoc';
import ServiceAPI from '../../../utils/fetch.api';
import { BACKEND_API } from '../../../app.constant';
import Authentication from '../../../utils/Authentication.helper';
import { setUser } from '../../../store/actions/userActions';
import { Link } from 'react-router-dom';

const Login = ({ history, user, setUser }) => {
	const [value, setValue] = useState({
		email: '',
		password: '',
	});

	const { isLoggedIn, role } = user;

	const onChangeHandler = (e) => {
		const stateKey = e.target.name;
		const stateValue = e.target.value;
		setValue({ ...value, [stateKey]: stateValue });
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();

		ServiceAPI.post(`${BACKEND_API}/login`, value)
			.then((result) => {
				if (!result.success) {
					throw result;
				}
				const { token, user } = result.data;
				Authentication.set({ token, user });
				toast.success(result.message);
				setValue({ email: '', password: '' });
				setUser({
					name: user.name,
					email: user.email,
					role: user.role,
					isLoggedIn: true,
				});
			})
			.catch((err) => {
				console.log(err);
				toast.error(err.message);
			});
	};

	const logInForm = (
		<form onSubmit={onSubmitHandler}>
			{formData.map((data) => {
				const { id, label, name, type } = data;
				return (
					<div key={id} className="form-group">
						<label htmlFor={data.name} className="text-muted">
							{label}
						</label>
						<input
							type={type}
							name={name}
							className="form-control"
							required={true}
							onChange={onChangeHandler}
							value={value[name]}
						/>
					</div>
				);
			})}
			<Link to='/auth/password/reset'>Forget Password</Link>
			<div>
				<button className="btn btn-primary" type="submit">
					Sign up
				</button>
			</div>
		</form >
	);

	if (isLoggedIn && role === 'admin') {
		history.push('/admin');
	} else if (isLoggedIn) {
		history.push('/profile');
	}

	return (
		<Layout>
			<div className="col-md-6 offset-md-3">
				<h1 className="p-5 text-center">Login</h1>
				{logInForm}
			</div>
		</Layout>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};

const mapActionToProps = (dispatch) => {
	return {
		setUser: (user) => dispatch(setUser(user)),
	};
};

export default connect(mapStateToProps, mapActionToProps)(Login);
