import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { getQuestionApi, updateQuestionApi } from '../../api/questions'
import Button from '../../utils/Button/Button'
import Swal from 'sweetalert2'
import { useAuth } from '../../provider/AuthProvider'

import './ChangeQuestionsForm.scss'

export default function ChangeQuestionsForm() {
  const [dataQuestion, setDataQuestion] = useState(null)
  const { register, handleSubmit, formState: { errors }, setValue } = useForm()
  const { setToken } = useAuth()

  useEffect(() => {
    getQuestion()
  }, [])

  const getQuestion = async () => {
    const result = await getQuestionApi()
    if (result.ok) return setDataQuestion(result.result.result)
  }

  const onSubmit = async (data) => {
    updateQuestionApi(data).then(response => {
      return Swal.fire({ icon: "success", text: "Preguntas actualizadas" })
    }).catch(err => Swal.fire({ icon: "warning", text: "Error, Intenta de nuevo" }))
  }

  useEffect(() => {
    if(dataQuestion){
      setValue('question1', dataQuestion.question1)
      setValue('question2', dataQuestion.question2)
      setValue('question3', dataQuestion.question3)
      setValue('question4', dataQuestion.question4)
    }
    if(!dataQuestion){
      setValue('question1', 'Comida favorita')
      setValue('question2', 'Artista favorito')
      setValue('question3', 'Lugar favorito')
      setValue('question4', 'Color favorito')
    }
  }, [dataQuestion])

  return (
    <form className="changeQuestions" onSubmit={handleSubmit(onSubmit)}>
      <div className='changeQuestions__inputs'>
        <section>
          <label htmlFor="q1">Pregunta 1</label>
          <input type="text" name="q1" id="q1" {...register("question1")} />
        </section>
        <section>
          <label htmlFor="q2">Pregunta 2</label>
          <input type="text" name="q2" id="q2" {...register("question2")} />
        </section>
        <section>
          <label htmlFor="q3">Pregunta 3</label>
          <input type="text" name="q3" id="q3" {...register("question3")} />
        </section>
        <section>
          <label htmlFor="q4">Pregunta 4</label>
          <input type="text" name="q4" id="q4" {...register("question4")} />
        </section>
      </div>
      <div className='changeQuestions__btn'>
        <Button value="Actualizar preguntas" />
        <Button secundary value="Cerrar sesión" onClick={() => setToken(false)} />
      </div>
    </form>
  )
}
