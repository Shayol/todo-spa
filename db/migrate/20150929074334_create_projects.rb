class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.text :title
      t.integer :position
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
