import React from 'react'
import styles from "../../../styles/admin/form/NewClientForm.module.css";
import {AiFillCloseCircle} from "react-icons/ai"
import { Button, Input, Textarea } from '@nextui-org/react';
import useForm from '../../../hooks/useForm';
import { ClientInterface, ClientResponse } from '../../../interfaces';

interface Prop {
    setModal: (state:boolean) => boolean;
}

const NewClientForm = ({setModal}: Prop) => {
    const {email, name, surnames, phone, message,onChange, form} = useForm<ClientInterface>({
        name: "",
        surnames: "",
        email: "",
        phone: "",
        message: ""
    })

    const closeModal = () => {
        setModal(false);
    }

  return (
    <form className={`${styles.formContainer}`}>
        <AiFillCloseCircle className={styles.closeIcon} onClick={closeModal} />
        <h3>Agregar un Nuevo Cliente</h3>
        <Input labelPlaceholder="Nombre" name="name" value={name} onChange={onChange} />
        <Input labelPlaceholder="Apellidos" name="surnames" value={surnames} onChange={onChange} />
        <Input labelPlaceholder="Email" name="email" value={email} onChange={onChange} />
        <Input labelPlaceholder="Telefono" name="phone" value={phone} onChange={onChange} />
        <Textarea placeholder="Mensaje" rows={4} name="message" value={message} onChange={onChange} />
        <Button >
            Agregar
        </Button>
    </form>
  )
}

export default NewClientForm