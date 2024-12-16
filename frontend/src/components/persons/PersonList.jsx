import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { PersonService } from "../../services/PersonService"; // Importar el servicio
import PersonForm from "./PersonForm";

const PersonList = () => {
  const personService = new PersonService(); // Instanciar el servicio
  const [persons, setPersons] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [newPerson, setNewPerson] = useState({ fullName: "", email: "", date_born: "", phone: "", address: "" });
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const toast = React.useRef(null);

  const fetchPersons = async () => {
    try {
      const response = await personService.getList(); // Usar el servicio para obtener los datos

      setPersons(response);
    } catch (error) {
      console.error("Error al cargar persons:", error);
    }
  };
  useEffect(() => {
    fetchPersons();
  }, []);


  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta persona?")) {
      try {
        await personService.deleteData(id);
        setPersons(persons.filter((persona) => persona.id !== id));
        toast.current.show({
          severity: "success",
          summary: "Person eliminated",
          life: 3000,
        });
      } catch (error) {
        console.error("Error deleting person:", error);
        toast.current.show({
          severity: "error",
          summary: "Error when deleting",
          detail: "There was a problem deleting the person.",
          life: 3000,
        });
      }
    }
  };

  const handleEdit = (persona) => {
    setSelectedPerson(persona);
    setNewPerson({ fullName: persona.fullName, email: persona.email, date_born: persona.date_born, phone: persona.phone, address: persona.address });
    setIsEditing(true);
    setIsDialogVisible(true);
  };

 
  return (
    <div>
      <Toast ref={toast} />
      <h1>Persons Catalog</h1>
      <Button label="Agregar Persona" icon="pi pi-plus" onClick={() => setIsDialogVisible(true)} className="mb-3" severity="success" />
      
      <DataTable value={persons} paginator rows={10} selectionMode="single" dataKey="id" > 
        <Column field="name" header="Name" />
        <Column field="lastname" header="Last Name" />
        <Column field="email" header="Email" />
        <Column field="date_born" header="Date of Birth" />
        <Column field="phone" header="Phone" />
        <Column field="address" header="Address" />
        <Column
          body={(rowData) => (
            <>
              <Button icon="pi pi-pencil" className="p-button-rounded p-button-info mr-5" onClick={() => handleEdit(rowData)} />
              <Button icon="pi pi-trash" className="p-button-rounded p-button-danger ml-2" onClick={() => handleDelete(rowData.id)} />
            </>
          )}
          header="Actiones"
        />
      </DataTable>

      {/* Dialog para editar y agregar */}
      <Dialog visible={isDialogVisible} style={{ width: '450px' }} header={isEditing ? 'Edit Person' : 'Add Person'} modal onHide={() => setIsDialogVisible(false)}>
        <PersonForm
          onSave={fetchPersons}
          onClose={() => setIsDialogVisible(false)}
          person={selectedPerson}
        />
      </Dialog>
    </div>
  );
};

export default PersonList;
