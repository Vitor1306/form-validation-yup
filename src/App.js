import React, { useRef } from 'react';
import { Form } from '@unform/web';
import { Scope } from '@unform/core';
import * as Yup from 'yup';
import './App.css';

import Input from './components/Form/input'

const initialData = {
  email: 'jotavito@teste.com.br'
}

function App() {
  const formRef = useRef(null);


  async function handleSubmit(data, { reset }) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome e obrigatorio'),
        email: Yup.string()
          .email('Digite um e-mail valido')
          .required('O e-mail e obrigatorio'),
        adress: Yup.object().shape({
          city: Yup.string()
            .min(3, 'no minimo 3 caracteres')
            .required('cidade obrigatoria')
        })

      });

      await schema.validate(data, {
        abortEarly: false,
      })

      console.log(data);

      formRef.current.setErrors({});

      reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach(error =>{
          errorMessages[error.path] = error.message;
        })

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  return (
    <div className="App">
      <h1>Hello World</h1>

      <Form ref={formRef} initialData={initialData} onSubmit={handleSubmit}>
        <Input name="name" />
        <Input type="email" name="email" />
        <Input type="password" name="password" />

        <Scope path="adress" >
          <Input name="street" />
          <Input name="neighborhood" />
          <Input name="city" />
          <Input name="state" />
          <Input name="number" />
        </Scope>

        <button type="submit">Enviar</button>
      </Form>
    </div>
  );
}

export default App;
