import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';

const CarBooking = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { carId } = useParams();
    const [date, setDate] = React.useState(new Date());
    const { user } = useAuth();
    const [car, setCar] = useState([])
    useEffect(() => {
        const url = `https://afternoon-atoll-80165.herokuapp.com/cars/${carId}`
        fetch(url)
            .then(res => res.json())
            .then(data => setCar(data))
    }, []);

    const onSubmit = data => {
        fetch('https://afternoon-atoll-80165.herokuapp.com/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result.insertedId) {

                    alert('Your booking successful')
                    reset()
                }
            })
    }
    return (
        <div>
            <form className="booking-form" onSubmit={handleSubmit(onSubmit)}>
                <input defaultValue={user.displayName} {...register("name")} />
                <input defaultValue={user.email} {...register("email", { required: true })} />
                {errors.email && <span className="error">This field is required</span>}
                <input placeholder="Address" defaultValue="" {...register("address", { required: true })} />
                {errors.address && <span className="error">This field is required</span>}
                <input placeholder="City" defaultValue="" {...register("city", { required: true })} />
                {errors.city && <span className="error">This field is required</span>}
                <input placeholder="phone number" defaultValue="" {...register("phone", { required: true })} />
                {errors.phone && <span className="error">This field is required</span>}
                <input defaultValue={car.model} {...register("model", { required: true })} />
                <input defaultValue={car.price} {...register("price", { required: true })} />
                <input readOnly placeholder="Desired Date" defaultValue={date.toLocaleDateString()} {...register("date")} />
                <input type="submit" />
            </form>
        </div>
    );
};

export default CarBooking;