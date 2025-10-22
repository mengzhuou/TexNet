import React from "react";
import styles from "./Profile.module.scss";

const Profile = () => {
  const contactInfo = {
    companyName: "zhixuan",
    contactPerson: "LIN LI",
    email: "example@email.com",
    phone: "+1 (123) 456-7890"
  };

  const companyAddress = {
    country: "USA",
    state: "NY",
    unitNumber: "23",
    streetNumber: "4r",
    street: "7th Ave & 51st St, Brooklyn, NY",
    city: "FLUSHING",
    postalCode: "11220"
  };

  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.pageTitle}>Profile</h1>

      <div className={styles.infoGrid}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Contact Information</h2>
          <div className={styles.row}>
            <label>Company Name:</label>
            <span>{contactInfo.companyName}</span>
          </div>
          <div className={styles.row}>
            <label>Contact Person:</label>
            <span>{contactInfo.contactPerson}</span>
          </div>
          <div className={styles.row}>
            <label>Email:</label>
            <span>{contactInfo.email}</span>
          </div>
          <div className={styles.row}>
            <label>Phone:</label>
            <span>{contactInfo.phone}</span>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Company Address</h2>
          <div className={styles.row}>
            <label>Country:</label>
            <span>{companyAddress.country}</span>
          </div>
          <div className={styles.row}>
            <label>Province/State:</label>
            <span>{companyAddress.state}</span>
          </div>
          <div className={styles.row}>
            <label>Unit Number:</label>
            <span>{companyAddress.unitNumber}</span>
          </div>
          <div className={styles.row}>
            <label>Street Number:</label>
            <span>{companyAddress.streetNumber}</span>
          </div>
          <div className={styles.row}>
            <label>Street:</label>
            <span>{companyAddress.street}</span>
          </div>
          <div className={styles.row}>
            <label>City:</label>
            <span>{companyAddress.city}</span>
          </div>
          <div className={styles.row}>
            <label>Postal Code:</label>
            <span>{companyAddress.postalCode}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
