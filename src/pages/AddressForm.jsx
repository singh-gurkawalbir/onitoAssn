// AddressForm.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  address: yup.string(),
  state: yup.string(),
  city: yup.string(),
  country: yup.string().required('Country is required'),
  pincode: yup.string().matches(/^[0-9]+$/, 'Pincode must be numeric'),
});

const AddressForm = ({ onSubmit,resetForm, setFlag}) => {
    const {
      handleSubmit,
      register,
      setValue,
      reset,
      formState: { errors ,isValid},
    } = useForm({
      resolver: yupResolver(schema),
    });
  
    const [countryOptions, setCountryOptions] = useState([]);
    const [loading, setLoading] = useState(false);
  
    const fetchCountryOptions = async (search) => {
      setLoading(true);
      try {
        const response = await fetch(`https://restcountries.com/v3/name/${search}`);
        const data = await response.json();
        setCountryOptions(data);
      } catch (error) {
        console.error('Error fetching country options:', error);
      } finally {
        setLoading(false);
      }
    };
  
    const handleCountryInputChange = (value) => {
      fetchCountryOptions(value);
    };
  
    const handleCountryOptionClick = (selectedCountry) => {
      setValue('country', selectedCountry);
      setCountryOptions([]);
    };

    const handleFormSubmit = (data) => {
        if (isValid) {
          onSubmit(data);
          reset();
          resetForm(); 
          setFlag(true)
        }
      }; 

  return (
    <>
      <p>Address Details</p>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <label>
          Address:
          <input type='text' {...register('address')} />
        </label>

        <label>
          State:
          <input type='text' {...register('state')} />
        </label>

        <label>
          City:
          <input type='text' {...register('city')} />
        </label>

        <label>
          Country:
          <input
            type='text'
            required
            {...register('country', { required: 'Country is required' })}
            onChange={(e) => handleCountryInputChange(e.target.value)}
          />
          {loading && <p className='error'>Loading country options...</p>}
          {countryOptions &&
            (countryOptions.length ? (
              <ul className='country-list'>
                {countryOptions.map((country) => (
                  <li
                    key={country.name.common}
                    onClick={() => handleCountryOptionClick(country.name.common)}
                    className='country-option'
                  >
                    {country.name.common}
                  </li>
                ))}
              </ul>
            ) : (
              <p></p>
            ))}
          {errors?.country && <p className='error'>{errors.country.message}</p>}
        </label>

        <label>
          Pincode:
          <input type='text' required {...register('pincode')} />
          {errors?.pincode && <p className='error'>{errors.pincode.message}</p>}
        </label>

        <button type='submit'>Submit Address</button>
      </form>
    </>
  );
};

export default AddressForm;
