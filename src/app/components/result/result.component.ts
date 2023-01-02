import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Result } from 'src/app/classes/result';
import { ResultService } from 'src/app/services/result.service';
import { ExpandedDialogueComponent } from '../dialogues/expanded-dialogue/expanded-dialogue.component';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  public results : Result[] = [];

  constructor(
    private _resultService: ResultService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initializePage();
  }

  initializePage(): void {
    console.log('calling get results');
    this.results = [];
    this._resultService.getResults().subscribe((res : Result[]) => {
      console.log(res);
      if(res.length > 0) {
        res.forEach(element => {
          this.results.push(element);
        });
      }
    })
  }

  deleteResult(result : Result) : void {
    console.log(result.id);
    if(result.id != undefined && result.id != null) {
      this._resultService.deleteResult(result.id).subscribe(()=> {
        this.initializePage();
      });
    }
  }

  openText(result? : Result) : void {
    const dialogRef = this.dialog.open(ExpandedDialogueComponent, {
      width: '800px',
      data: {
        title : result?.title,
        text : result?.text,
        summary : result?.summary,
        questions : result?.questions,
        type : 'TEXT'
      }
    });
  }

  openSummary(result? : Result) : void {
    const dialogRef = this.dialog.open(ExpandedDialogueComponent, {
      width: '800px',
      data: {
        title : result?.title,
        text : result?.text,
        summary : result?.summary,
        questions : result?.questions,
        type : 'SUMMARY'
      }
    });
  }

  openQuestions(result? : Result) : void {
    const dialogRef = this.dialog.open(ExpandedDialogueComponent, {
      width: '800px',
      data: {
        title : result?.title,
        text : result?.text,
        summary : result?.summary,
        questions : result?.questions,
        type : 'QUESTIONS'
      }
    });
  }
}
