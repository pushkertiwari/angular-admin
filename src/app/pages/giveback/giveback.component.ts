import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-giveback',
  templateUrl: './giveback.component.html',
  styleUrls: ['./giveback.component.css']
})
export class GivebackComponent implements OnInit {

  public editor;
  public editorContent;
  public editorConfig = {
    placeholder: 'About Your Self'
  };
  myForm: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      'textEdit': ['', Validators.required],
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.editorContent = this.editorContent;
      console.log('you can use the quill instance object to do something', this.editor);
      // this.editor.disable();
    }, 2800);
  }

  onEditorBlured(quill) {
    // console.log('editor blur!', quill);
  }

  onEditorFocused(quill) {
    // console.log('editor focus!', quill);
  }

  onEditorCreated(quill) {
    this.editor = quill;
    // console.log('quill is ready! this is current quill instance object', quill);
  }

  onContentChanged({ quill, html, text }) {
   // console.log('quill content is changed!', quill, html, text);
  }
  onSubmit() {
    console.log(this.myForm.value);
  }

}

