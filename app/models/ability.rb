class Ability
  include CanCan::Ability

  def initialize(user)
    can :manage, Project, user_id: user.id
    can :manage, Task, project: { user_id: user.id }
    can :manage, Comment, task: { project: { user_id: user.id } }
    can :manage, Attachment, comment: {task: { project: { user_id: user.id } }}
    # See the wiki for details:
    # https://github.com/CanCanCommunity/cancancan/wiki/Defining-Abilities
  end
end
