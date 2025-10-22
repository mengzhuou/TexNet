import React, { Component } from "react";
import styles from "./ContactManagement.module.scss";

class ContactManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: ["Blacklist", "通讯录1", "通讯录"],
      activeTag: "通讯录",
      search: "",
      contacts: [
        { id: 1, number: "123-456-7890", name: "John Doe", tags: ["通讯录"], blacklist: "No", dnd: "No", note: "" },
      ]
    };
  }

  render() {
    const { tags, activeTag, contacts } = this.state;

    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Contact List</h1>

        {/* Tag Section */}
        <div className={styles.tagSection}>
          {tags.map((tag, index) => (
            <div key={index} className={`${styles.tag} ${activeTag === tag ? styles.active : ""}`}>
              <div className={styles.tagIcon}></div>
              <span>{tag}</span>
            </div>
          ))}
          <div className={styles.addTag}>
            <div className={styles.addIcon}>+</div>
            <span>Add</span>
          </div>
        </div>

        {/* Button Row */}
        <div className={styles.buttonRow}>
          <button>Rename</button>
          <button>Delete</button>
          <button>Import</button>
          <button>Export</button>
        </div>

        {/* Search Row */}
        <div className={styles.searchRow}>
          <input type="text" placeholder="Search contacts" />
          <button>Search</button>
        </div>

        {/* Add Contact Form */}
        <div className={styles.addContactForm}>
          <h3>Add New Contact</h3>
          <div className={styles.formRow}>
            <input type="text" placeholder="Number" />
            <input type="text" placeholder="Name" />
            <select>
              {tags.map((tag, i) => (
                <option key={i} value={tag}>{tag}</option>
              ))}
            </select>
            <button>Save</button>
          </div>
        </div>

        {/* Contact Table */}
        <table className={styles.contactTable}>
          <thead>
            <tr>
              <th>#</th>
              <th>Number</th>
              <th>Name</th>
              <th>Tags</th>
              <th>Blacklist</th>
              <th>DND</th>
              <th>Actions</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length > 0 ? (
              contacts.map((contact, index) => (
                <tr key={index}>
                  <td>{contact.id}</td>
                  <td>{contact.number}</td>
                  <td>{contact.name}</td>
                  <td>{contact.tags.join(", ")}</td>
                  <td>{contact.blacklist}</td>
                  <td>{contact.dnd}</td>
                  <td><button>Edit</button></td>
                  <td>{contact.note}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>No contacts found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ContactManagement;
