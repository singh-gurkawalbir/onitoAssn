// Form.js
import React, { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PersonalDetails from "./PersonalDetails"
import AddressForm from './AddressForm';
import PersonalDetailsDataTable from '../components/DataTable';
import AddressDetailsDataTable from '../components/AddressDetailsDataTable';
import {
    addPersonalDetails,
    addAddressDetails,
    selectPersonalDetails,
    selectAddressDetails,
  } from '../slices/formSlice';
import './Form.css'
const Form = () => {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showTable, setShowTable] = useState(false)
  const [formData, setFormData] = useState({
    personalDetails: {}, // Initial values for personal details
    addressDetails: {},   // Initial values for address details
  });
  const dispatch = useDispatch()
  const personalDetails = useSelector(selectPersonalDetails);
  const addressDetails = useSelector(selectAddressDetails);

  const onSubmit = (data) => {
    dispatch(addPersonalDetails(data));
    setShowAddressForm(true);
    setFormData({ ...formData, personalDetails: data });
  };

  const onSubmitAddressForm = (data) => {
    dispatch(addAddressDetails(data));
    setShowTable(true);
    setFormData({ ...formData, addressDetails: data });
  };
const [flag,setFlag]= useState(false)
  const resetForm = () => {
    // Reset the local state to its initial values
    setFormData({
      personalDetails: {},
      addressDetails: {},
    });
  };

  return (
    <div >
      {<PersonalDetails onSubmit={onSubmit} flag={flag} resetForm={resetForm} setFlag={setFlag}></PersonalDetails>}
      {showAddressForm&& <AddressForm onSubmit={onSubmitAddressForm} flag={flag} setFlag={setFlag} resetForm={resetForm}/>}
      {<PersonalDetailsDataTable data={personalDetails}></PersonalDetailsDataTable>}
      {<AddressDetailsDataTable data={addressDetails}></AddressDetailsDataTable>}
    </div>
  );
};

export default Form;
