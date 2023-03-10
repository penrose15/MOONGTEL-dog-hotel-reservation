import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import useDebounce from '@/hooks/useDebounce'
import {toast} from 'react-toastify'
import {Form} from '@/pages/signup'
import {Validate} from '@/utils/validate'
import {useRouter} from 'next/router'
import AuthButton from '../AuthButton/AuthButton'
import LabelInput from '../LabelInput/LabelInput'
import AgreeBox from './AgreeBox'
import Postcode from './Postcode'
import {authService, duplicateCheck} from '@/apis/AuthAPI'

interface Props {
  mode: 'user' | 'company'
}

function UserForm({mode}: Props) {
  const router = useRouter()

  const [form, setForm] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    name: '',
    phone: '',
    companyName: '',
    address: '',
    detailAddress: '',
  })

  const [errors, setErrors] = useState({
    email: true,
    password: true,
    passwordCheck: true,
    name: true,
    phone: true,
  })

  const [checks, setChecks] = useState({
    totalAgree: false,
    useAgree: false,
    privateAgree: false,
    snsAgree: false,
    ageAgree: false,
  })

  const debouceValue = useDebounce(form.email, 300)

  const [emailDuplicate, setEmailDuplicate] = useState(false)

  useEffect(() => {
    duplicateCheck(debouceValue).then((res) => setEmailDuplicate(res.data))
  }, [debouceValue])

  const {email, password, passwordCheck, name, phone, companyName, detailAddress, address} = form

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let error = false

    const {name, value} = e.target

    setForm({
      ...form,
      [name]: value,
    })

    if (name === 'email') {
      error = Validate.emailValidate(value)
    }

    if (name === 'password') {
      error = Validate.passwordValidate(value)
    }

    if (name === 'passwordCheck') {
      error = Validate.passwordConfirmValidate(password, value)
    }

    if (name === 'name') {
      error = Validate.userNameValidate(value)
    }

    if (name === 'phone') {
      error = Validate.phoneValidate(value)
    }

    setErrors({
      ...errors,
      [name]: error,
    })
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newForm: Partial<Form> = form

    const {email, password, passwordCheck, name, phone} = newForm

    if (!email || !password || !passwordCheck || !name || !phone) {
      return toast.error('?????? ????????? ??????????????????')
    }

    if (
      errors.email === true ||
      errors.password === true ||
      errors.passwordCheck === true ||
      errors.phone === true ||
      errors.name === true ||
      emailDuplicate === true
    ) {
      return toast.error('????????? ?????? ??????????????????')
    }

    if (!checks.useAgree || !checks.privateAgree || !checks.ageAgree) {
      return toast.error('?????? ????????? ??????????????????')
    }

    let request

    if (mode === 'user') {
      request = {
        email,
        password,
        username: name,
        phone,
      }
    } else {
      request = {
        email,
        password,
        username: name,
        ceo: name,
        phone,
        companyName,
        address,
        detailAddress,
      }
    }

    const result = await authService.signUp(request, mode)
    console.log(result)

    if (result?.status === 201) {
      router.push('/login')
      toast.success('??????????????? ?????????????????????.')
    } else {
      toast.error('??????????????? ??????????????????.')
    }
  }

  return (
    <SignUpForm onSubmit={onSubmit}>
      <LabelInput
        type={'email'}
        name={'email'}
        value={email}
        onChange={onChange}
        label={'?????????'}
        Errors={errors.email}
        ErrorMessage={'????????? ????????? ???????????? ????????????.'}
        emailDuplicate={emailDuplicate}
      />
      <LabelInput
        type={'password'}
        name={'password'}
        value={password}
        onChange={onChange}
        label={'????????????'}
        Errors={errors.password}
        ErrorMessage={'??????????????? ?????? ?????? ???????????? ?????? 8??? ???????????? ??????????????????.'}
      />
      <LabelInput
        type={'password'}
        name={'passwordCheck'}
        value={passwordCheck}
        onChange={onChange}
        label={'???????????? ??????'}
        Errors={errors.passwordCheck}
        ErrorMessage={'??????????????? ???????????? ????????????. ?????? ????????? ?????????.'}
      />
      <LabelInput
        type={'text'}
        name={'name'}
        value={name}
        onChange={onChange}
        label={'??????'}
        Errors={errors.name}
        ErrorMessage={'???????????? ????????? ????????? ??? ????????????.'}
      />
      <LabelInput
        type={'text'}
        name={'phone'}
        value={phone}
        onChange={onChange}
        label={'????????????'}
        placeholder={'Ex) 010-1234-5678'}
        Errors={errors.phone}
        ErrorMessage={'????????? ?????? ????????? ???????????? ????????????.'}
      />
      {mode === 'company' && (
        <>
          <LabelInput
            type={'text'}
            name={'companyName'}
            value={companyName as string}
            onChange={onChange}
            label={'?????????'}
          />
          <AddressBox>
            <LabelInput
              type={'text'}
              name={'detailAddress'}
              value={detailAddress as string}
              onChange={onChange}
              label={'??????/????????????'}
              width={'22rem'}
            />
            <Postcode setForm={setForm} />
          </AddressBox>
          <LabelInput
            type={'text'}
            name={'address'}
            value={address as string}
            onChange={onChange}
            label={'????????????'}
          />
        </>
      )}
      <Border />
      <AgreeBox checks={checks} setChecks={setChecks} />
      <AuthButton title="????????????" />
    </SignUpForm>
  )
}

export default UserForm

const SignUpForm = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  margin-top: 36px;
  margin-bottom: 36px;
  gap: 16px;
`
const AddressBox = styled.div`
  display: flex;
  gap: 7px;
`
const Border = styled.div`
  margin: 40px 0;
  width: 100%;
  height: 0.1px;
  border: 0.5px solid #e5e5e5;
  background-color: #e5e5e5;
`
