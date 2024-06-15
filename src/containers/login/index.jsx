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

export function Login() {
  const navigete = useNavigate();

  const schema = yup
    .object({
      email: yup
        .string()
        .email('Digite um  e-mail válido')
        .required('O e-mail é obrigatório'),
      password: yup
        .string()
        .min(6, 'Senha deve ter no minimo 6 caracteries')
        .required('Digite uma senha'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (clientData) => {
    try {
      const { data } = await toast.promise(
        api.post('/session', {
          email: clientData.email,
          password: clientData.password,
        }),
        {
          pending: 'Verificando seus dados',
          success: {
            render() {
              setTimeout(() => {
                navigete('/');
              }, 2000);
              return 'Seja Bem-vindo(a) 👌';
            },
          },
          error: 'Email ou Senha Incorretos🤯',
        },
      );
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      toast.error(
        'Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.',
      );
    }
  };

  return (
    <Container>
      <LeftContainer>
        <img src={Logo} alt="logo-devburger" />
      </LeftContainer>
      <RightContainer>
        <Title>
          Olá, seja bem vindo ao <span>Dev Burguer!</span>
          <br></br> Acesse com seu <span>Login e senha.</span>
        </Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <label>Email</label>
            <input type="email" {...register('email')}></input>
            <p>{errors?.email?.message}</p>
          </InputContainer>

          <InputContainer>
            <label>Senha</label>
            <input type="password" {...register('password')}></input>
            <p>{errors?.password?.message}</p>
          </InputContainer>

          <Button type="submit">ENTRAR</Button>
        </Form>
        <p>
          Não possui conta? <Link to="/cadastro">Clique aqui.</Link>
        </p>
      </RightContainer>
    </Container>
  );
}
