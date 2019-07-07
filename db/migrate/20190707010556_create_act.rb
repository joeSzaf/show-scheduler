class CreateAct < ActiveRecord::Migration[5.2]
  def change
    create_table :acts do |t|
      t.string :name, null: false
      t.string :contact_name, null: false
      t.string :contact_email, null: false
      t.text :description
      t.boolean :archived, :default => false

      t.timestamps null: false
    end
  end
end
