import { NgModule } from '@angular/core';
import { EditorRoutingModule } from './editor-routing-module';
import { Editor } from './pages/editor/editor';
import { SharedModule } from '../../shared/shared-module';

@NgModule({
  declarations: [Editor],
  imports: [EditorRoutingModule, SharedModule],
})
export class EditorModule {}
