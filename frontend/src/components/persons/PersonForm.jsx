import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { PersonService } from "../../services/PersonService";

const PersonForm = ({ person = {}, onSave, onClose }) => {
  const dataService = new PersonService();
  const toast = useRef(null);
  const [formData, setFormData] = useState({
    name: person.name || "",
    last_name: person.lastname || "",
    email: person.email || "",
    date_born: person.date_born ? new Date(person.date_born) : null,
    phone: person.phone || "",
    address: person.address || "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: null }); 
  };

  const handleDateChange = (e) => {
    setFormData({ ...formData, date_born: e.value });
    setErrors({ ...errors, date_born: null });
  };

  const formatDate = (date) => {
    // Verifica si la fecha es válida
    if (!date) return ""; // Si no hay fecha, devuelve cadena vacía
  
    const d = new Date(date); // Crea un objeto Date a partir del valor pasado
    if (isNaN(d.getTime())) return ""; // Verifica si la fecha es inválida
  
    const year = d.getFullYear(); // Obtiene el año
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Mes (asegúrate que esté entre 01 y 12)
    const day = String(d.getDate()).padStart(2, "0"); // Día (asegúrate que esté entre 01 y 31)
  
    return `${year}-${month}-${day}`; // Formato: yyyy-mm-dd
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); 
    setLoading(true);
  
    // 1. Validar campos vacíos
    const newErrors = {};
    if (!formData.name) newErrors.name = "The name field is required.";
    if (!formData.last_name) newErrors.last_name = "The last name field is required.";
    if (!formData.email) newErrors.email = "The email field is required.";
    if (!formData.date_born) newErrors.date_born = "The date of birth field is required.";
  
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "The email format is invalid.";
    }

    if (formData.phone && formData.phone.length < 10) {
      newErrors.phone = "The phone number must have at least 10 digits.";
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
  
      const errorDetails = Object.entries(newErrors)
        .map(([field, message]) => `${capitalize(field)}: ${message}`)
        .join("\n");
  
      toast.current.show({
        severity: "error",
        summary: "Validation Error",
        detail: `Please correct the following fields:\n${errorDetails}`,
        life: 8000,
      });
  
      setLoading(false);
      return;
    }


    const data = {
      name: formData.name,
      last_name: formData.last_name,
      email: formData.email,
      phone: formData.phone,
      date_born: formData.date_born ? formatDate(formData.date_born) : null,
      address: formData.address
    }
  
    // 2. Si no hay errores, enviar datos al backend
    try {
      if (person.id) {
        await dataService.updateData(data, person.id);
      } else {
        await dataService.saveData(data);  // Guardamos la persona
      }
  
      onSave(); // Actualiza la lista
      onClose();
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Person saved successfully",
      });
    } catch (error) {
      console.error("Error al guardar person:", error);
  
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "An unexpected error occurred while saving.",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Función auxiliar para capitalizar nombres de campos
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  
  

  return (
    <div className="p-card p-4">
      <Toast ref={toast} />
      <form onSubmit={handleSubmit} className="p-fluid">
        {/* Nombre */}
        <div className="p-field mb-2">
          <label htmlFor="name">Name</label>
          <InputText
            id="name"
            name="name"
            placeholder="John"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "p-invalid" : ""}
          />
          {errors.name && <small className="p-error">{errors.name}</small>}
        </div>

        {/* Apellido */}
        <div className="p-field mb-2">
          <label htmlFor="last_name">Last Name</label>
          <InputText
            id="last_name"
            name="last_name"
            placeholder="Doe"
            value={formData.last_name}
            onChange={handleChange}
            className={errors.last_name ? "p-invalid" : ""}
          />
          {errors.last_name && (
            <small className="p-error">{errors.last_name}</small>
          )}
        </div>

        {/* Email */}
        <div className="p-field mb-2">
          <label htmlFor="email">Email</label>
          <InputText
            id="email"
            name="email"
            type="email"
            placeholder="johndoe@gmail.com"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "p-invalid" : ""}
          />
          {errors.email && <small className="p-error">{errors.email}</small>}
        </div>

        {/* Fecha de nacimiento */}
        <div className="p-field mb-2">
          <label htmlFor="date_born">Date of Birth</label>
          <Calendar
            id="date_born"
            name="date_born"
            value={formData.date_born}
            onChange={handleDateChange}
            dateFormat="yy-mm-dd"
            showIcon
            className={errors.date_born ? "p-invalid" : ""}
          />
          {errors.date_born && (
            <small className="p-error">{errors.date_born}</small>
          )}
        </div>

        {/* Teléfono */}
        <div className="p-field mb-2">
          <label htmlFor="phone">Phone</label>
          <InputText
            id="phone"
            name="phone"
            placeholder="123456789"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? "p-invalid" : ""}
          />
          {errors.phone && <small className="p-error">{errors.phone}</small>}
        </div>

        {/* Dirección */}
        <div className="p-field mb-2">
          <label htmlFor="address">Address</label>
          <InputText
            id="address"
            name="address"
            placeholder="123 Main St"
            value={formData.address}
            onChange={handleChange}
            className={errors.address ? "p-invalid" : ""}
          />
          {errors.address && (
            <small className="p-error">{errors.address}</small>
          )}
        </div>

        {/* Botón de enviar */}
        <Button
          type="submit"
          label={loading ? "Saving..." : "Save"}
          icon="pi pi-save"
          className="p-mt-3"
          disabled={loading}
        />
      </form>
    </div>
  );
};

export default PersonForm;
