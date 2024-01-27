import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  name: yup.string().required().min(3),
  age: yup.number().required().positive('Age must be a positive number'),
  sex: yup.string().required().oneOf(['Male', 'Female']),
  mobile: yup.string().matches(/^[6-9]\d{9}$/, 'Invalid Indian Mobile Number'),
  govtIdType: yup.string().oneOf(['Aadhar', 'PAN']),
  govtId: yup.string().when('govtIdType', {
    is: (govtIdType) => govtIdType === 'Aadhar',
    then:()=> yup.string().matches(/^\d{12}$/, {
      message: 'Invalid Aadhar Number',
      excludeEmptyString: true
    }),
    otherwise:()=> yup.string().matches(/^[A-Za-z0-9]{10}$/, {
      message: 'Invalid PAN Number',
      excludeEmptyString: true
    })
  }),
});

const PersonalDetails = ({ onSubmit ,resetForm, flag, setFlag}) => {
  const {
    handleSubmit,
    register,
    formState: { errors ,isValid },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if(flag){
        reset()
    }
    setFlag(false)
  }, [flag])
  
  const handleClick = () => {
    if (isValid) {
      resetForm();
    }
  };
  
  return (
    <>
      <p>Personal Details</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Name:
          <input type='text' {...register('name')} className='gen' required />
          {errors.name && <p className='error'>{errors.name.message}</p>}
        </label>
        <label>
          Age:
          <input type='text' {...register('age')} className='gen' required />
          {errors.age && <p className='error'>{errors.age.message}</p>}
        </label>
        <label>
          Sex:
          <select {...register('sex')} className='gen'>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>
          {errors.sex && <p className='error'>{errors.sex.message}</p>}
        </label>
        <label>
          Mobile:
          <input type='text' {...register('mobile')} className='gen' />
          {errors.mobile && <p className='error'>{errors.mobile.message}</p>}
        </label>
        <label>
          Govt Issued ID Type:
          <select {...register('govtIdType')} className='gen'>
            <option value='Aadhar'>Aadhar</option>
            <option value='PAN'>PAN</option>
          </select>
          {errors.govtIdType && (
            <p className='error'>{errors.govtIdType.message}</p>
          )}
        </label>

        <label>
          Govt Issued ID:
          <input
            type='text'
            {...register('govtId')}
            className='gen'
          />
          {errors.govtId && <p className='error'>{errors.govtId.message}</p>}
        </label>
        <button className='button' onClick={handleClick} type='submit'>
          Next
        </button>
      </form>
    </>
  );
};

export default PersonalDetails;
