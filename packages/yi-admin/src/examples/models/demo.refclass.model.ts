import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { timestamps: true, collection: 'yi_admin_demo_ref' } })
export class RefFieldClass {
    @prop()
    public name: string;

    @prop()
    public title: string;
}

const RefFieldClassModel = getModelForClass(RefFieldClass);
export default RefFieldClassModel;
