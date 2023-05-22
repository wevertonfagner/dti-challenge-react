import { useState, useEffect } from 'react';
import React from 'react';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';

import imagemErro from './assets/imgErroX.png';

import './styles.css'


function useFormik ({
  initialValues,
  validate
}) {

  const [touched, setTouchedFields] = useState({});
  const [errors, setErrors] = useState({}); 
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    validateValues(values);
  },[values]);

function handleChange(event) {
  const fieldName = event.target.getAttribute('name');
  const {value} = event.target;
  
  setValues({
    ...values,
    [fieldName]: value,
  })
  
}

function handleBlur(event) {
  const fieldName = event.target.getAttribute('name')
  setTouchedFields({
    ...touched,
    [fieldName]: true,
  })
}

function validateValues(values) {
  setErrors(validate(values))

 }

return {
  values,
  errors,
  touched,
  handleBlur,
  setErrors,
  handleChange
}
}

function Home() {
  const [CpfOuCnpj, setCpfOuCnpj] = useState("")
  const [buttonClicked, setButtonClicked] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setButtonClicked(true);
  }

  const formik = useFormik({
    initialValues: {
      nome:'',
      documento: '',
      divida: '',
      emprestimo: ''
    },

    

validate: function (values) {
  const errors = {};

  if (CpfOuCnpj == ''){
    errors.plan = 'Precisa escolher um tipo de documento'
  }

  if(values.nome === '' || values.nome.length < 3 || values.nome.length > 100 ) {
    if (values.nome.length < 3 && values.nome !== ''){
      errors.nome = 'Digite um nome válido'
    }else if (values.nome.length > 100) {
      errors.nome = "Nome grande demais"
    }else {
      errors.nome = "Este campo é obrigatório"
    }
   }

  if(CpfOuCnpj == 'CPF' && values.documento.replace(/[^a-z0-9]/gi,'').length < 11 || CpfOuCnpj == 'CNPJ' && values.documento.replace(/[^a-z0-9]/gi,'').length < 14 || values.documento == '') {
    if(CpfOuCnpj == 'CPF' && values.documento.replace(/[^a-z0-9]/gi,'').length < 11 && values.documento.replace(/[^a-z0-9]/gi,'') != '' || CpfOuCnpj == 'CNPJ' && values.documento.replace(/[^a-z0-9]/gi,'').length < 14 && values.documento.replace(/[^a-z0-9]/gi,'') != ''){
      errors.documento = "Este documento está incompleto"
    }else if (values.documento.replace(/[^a-z0-9]/gi,'') == ''){
      errors.documento = 'Este campo é obrigatório'
    }
  }

  if(values.divida === '') {
    errors.divida = 'Este campo é obrigatório'
  }

  if(values.emprestimo === '') {
    errors.emprestimo = 'Este campo é obrigatório'
  }

  return errors;
}
  });


  const handleSubmit = (event) => {
    event.preventDefault();

    if (Object.keys(formik.errors).length === 0) {
      const formData = {
        nome: formik.values.nome,
        documento: formik.values.documento.replace(/\D/g, ''),
        divida: formik.values.divida,
        emprestimo: formik.values.emprestimo
      }

      if (formData.emprestimo > 50000 || formData.emprestimo > formData.divida/2) {
        navigate('/reprovado');
      }else{
        navigate('/aprovado');
      }

      /* fetch('http://localhost:8080/emprestimo', {
        method: 'POST',
        body: JSON.stringify(formData),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });  */
    }else{
  alert('Por favor, preencha todos os campos.');
}

  };




  return (
    <div className="container">
      
      <div className="container-login">

        <div className='container-title'>
      <h1 className="title">Solicite seu empréstimo!</h1>
      <h2 className='sub-title'>Saia do aperto, preencha os campos ao lado e solicite agora um empréstimo.</h2>
      <p className='paragrafo'>Este crédito pode ser pago em até 12 vezes. O valor é debitado diretamente na folha do seu benefício, não sendo necessário receber boleto ou ir ao banco para quitar suas parcelas. Aproveite essa oportunidade única e garanta esse recurso extra para quitar suas despesas e imprevistos financeiros.</p>
      
      </div>
        <div className="wrap-login">
          
          <form className="login-form" onSubmit={handleSubmit}>
            
            <span className="login-form-title">Preencha os campos para solicitar</span>

            <div className="wrap-input-radio">
              <input className='input-radio1' id='input-radio1' type='radio' name='plan' value='CPF' checked={CpfOuCnpj === 'CPF' ? true : false} onChange={e => setCpfOuCnpj(e.target.value)} />
              <label className='label-radio' for='input-radio1'>Pessoa física</label>

              <input className='input-radio2' id='input-radio2' type='radio' name='plan' value='CNPJ' checked={CpfOuCnpj === 'CNPJ' ? true : false} onChange={e => setCpfOuCnpj(e.target.value)} />
              <label className='label-radio' for='input-radio2'>Pessoa jurídica</label>

              {formik.touched.documento && CpfOuCnpj === '' && <img src={imagemErro}/>}
            </div>

            <div className="wrap-input">
              <input className={formik.values.nome !== "" ? 'has-val input' : 'input'} type='text' name='nome' value={formik.values.nome.replace(/\d/g, '')} onBlur={formik.handleBlur} onChange={formik.handleChange}/>
              <span className='focus-input' data-placeholder={CpfOuCnpj === 'CNPJ' ? 'Nome da empresa' : 'Nome'}></span>
              
            {formik.touched.nome && formik.values.nome.length < 3 && formik.values.nome !== "" && <span className='formField_error'>{formik.errors.nome}</span>}
            
            {formik.touched.nome && formik.values.nome == "" && <span className='formField_error'>{formik.errors.nome}</span>}

            {formik.touched.nome && formik.values.nome.length > 100 && formik.values.nome !== "" && <span className='formField_error'>{formik.errors.nome}</span>}

            </div>

            <div className="wrap-input">
              
              <InputMask mask={CpfOuCnpj === 'CPF' ? '999.999.999-99' : CpfOuCnpj === 'CNPJ' ? '99.999.999/9999-99' : '' } className={formik.values.documento !== "" ? 'has-val input' : 'input'} type='text' name='documento' value={formik.values.documento.replace(/\D/g, '')} onBlur={formik.handleBlur} onChange={formik.handleChange} />
              <span className='focus-input' data-placeholder={CpfOuCnpj ? CpfOuCnpj : 'Documento'}></span>
              {formik.touched.documento && formik.values.documento.replace(/[^a-z0-9]/gi,'') == "" && <span className='formField_error'>{formik.errors.documento}</span>}

              {formik.touched.documento && formik.values.documento.replace(/[^a-z0-9]/gi,'').length < 11 && formik.values.documento.replace(/[^a-z0-9]/gi,'') != "" && <span className='formField_error'>{formik.errors.documento}</span>}

              {formik.touched.documento && formik.values.documento.replace(/[^a-z0-9]/gi,'').length < 14 && formik.values.documento.replace(/[^a-z0-9]/gi,'') != "" && <span className='formField_error'>{formik.errors.documento}</span>}

            </div>

            <div className="wrap-input">
              <input className={formik.values.divida !== "" ? 'has-val input' : 'input'} type='text' name='divida' value={formik.values.divida.replace(/\D/g, '')} onBlur={formik.handleBlur} onChange={formik.handleChange}/>
              <span className='focus-input' data-placeholder="Dívida atual"></span>
              {formik.touched.divida && formik.errors.divida && formik.values.divida == "" && <span className='formField_error'>{formik.errors.divida}</span>}

            </div>

            <div className="wrap-input">
              <input className={formik.values.emprestimo !== "" ? 'has-val input' : 'input'} type='text' name='emprestimo' value={formik.values.emprestimo.replace(/\D/g, '')} onBlur={formik.handleBlur} onChange={formik.handleChange}/>
              <span className='focus-input' data-placeholder="Empréstimo desejado"></span>
              {formik.touched.emprestimo && formik.errors.emprestimo && formik.values.emprestimo == "" && <span className='formField_error'>{formik.errors.emprestimo}</span>}

            </div>

            <div className='container-login-form-btn'>
              <button className='login-form-btn' onClick={handleButtonClick}>Solicitar</button>
            </div>

          </form>
        </div>
      </div>
      
    </div>
  );
  
}

export default Home;
