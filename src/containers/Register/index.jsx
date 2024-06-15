import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

import Logo from '../../assets/login.svg';
import { Button } from '../../components/Button';
import { api } from '../../services/api';
import {
  Container,
  Form,
  InputContainer,
  LeftContainer,
  RightContainer,
  Title,
  Link,
} from './styles';

export function Register() {
  const navigete = useNavigate();
  const schema = yup
    .object({
      name: yup.string().required('Nome obrigatório'),
      email: yup
        .string()
        .email('Digite um  e-mail válido')
        .required('O e-mail é obrigatório'),
      password: yup
        .string()
        .min(6, 'Senha deve ter no minimo 6 caracteries')
        .required('Digite uma senha'),
      ConfirmPassword: yup
        .string()
        .required('Confirme a senha')
        .oneOf([yup.ref('password')], 'As senha devem ser iguais'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    try {
      const { status } = await api.post(
        'users',
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        { validateStatus: () => true },
      );

      if (status === 200 || status === 201) {
        setTimeout(() => {
          navigete('/login');
        }, 2000);
        toast.success('Cadastro realizado com sucesso 👌');
      } else if (status === 409) {
        toast.error('E-mail já cadastrado');
      } else {
        throw new Error();
      }
    } catch (err) {
      toast.error('Falha no sistema! Tente mais tarde');
    }
  };

  return (
    <Container>
      <LeftContainer>
        <img src={Logo} alt="logo-devburger" />
      </LeftContainer>
      <RightContainer>
        <Title>Criar conta</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <InputContainer>
              <label>Nome</label>
              <input type="text" {...register('name')}></input>
              <p>{errors?.name?.message}</p>
            </InputContainer>

            <label>Email</label>
            <input type="email" {...register('email')}></input>
            <p>{errors?.email?.message}</p>
          </InputContainer>

          <InputContainer>
            <label>Senha</label>
            <input type="password" {...register('password')}></input>
            <p>{errors?.password?.message}</p>
          </InputContainer>

          <InputContainer>
            <label>Confirmar senha</label>
            <input type="password" {...register('ConfirmPpassword')}></input>
            <p>{errors?.ConfirmPassword?.message}</p>
          </InputContainer>

          <Button type="submit">CONFIRMAR CADASTRO</Button>
        </Form>
        <p>
          Já possui conta ? <Link to="/login">Clique aqui.</Link>
        </p>
      </RightContainer>
    </Container>
  );
}
