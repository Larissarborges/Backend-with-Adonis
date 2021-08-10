'use strict'

const Mail = use('Mail')
const Helpers = use('Helpers')

const TaskHook = exports = module.exports = {}

TaskHook.sendNewTaskMail = async (taskInstance) => {
  if (!taskInstance.user_id && !taskInstance.dirty.user_id)
    return

  const { email, username } = await taskInstance.user().fetch()

  const { title } = taskInstance

  await Mail.send(
    ['emails.new_task'],
    { username, title },
    message => {
      message
        .to(email)
        .from('diego@rocketseat.com.br', 'Diego')
        .subject('Nova tarefa para voce!')
    }
  )
}
