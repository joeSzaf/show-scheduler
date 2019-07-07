class CreateAssignment < ActiveRecord::Migration[5.2]
  def change
    create_table :assignments do |t|
      t.integer :duration, null: false
      t.belongs_to :show, null: false
      t.belongs_to :act, null: false

      t.timestamps null: false
    end
  end
end
