class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.text :title
      t.integer :position
      t.references :project, index: true, foreign_key: true
      t.boolean :done, default: false
      t.datetime :deadline

      t.timestamps null: false
    end
  end
end
