import { jsPDF } from 'jspdf'
import autoTable, { applyPlugin, autoTableInstanceType } from '../src/main'
const assert = require('assert')

applyPlugin(jsPDF)

describe('runner', () => {
  it('prototype', () => {
    const doc: any = new jsPDF()
    doc.autoTable({ body: [['cell']] })
    assert(true)
  })

  it('export', () => {
    const doc = new jsPDF()
    autoTable(doc, { body: [['cell']] })
    assert(true)
  })

  it('nodejs', () => {
    ;(global as any).window = {}
    const jsPDFNode = require('jspdf/dist/jspdf.node').jsPDF
    delete (global as any).window

    const doc = new jsPDFNode()
    autoTable(doc, { body: [['cell']] })
    assert(true)
  })

  it('add page in hook', () => {
    const doc = new jsPDF()
    autoTable(doc, {
      body: [['test']],
      willDrawCell: () => {
        doc.addPage()
      },
    })
    assert.equal(doc.getCurrentPageInfo().pageNumber, 2)
  })

  it('previous typing', () => {
    applyPlugin(jsPDF)
    const doc = new jsPDF()
    ;((doc as any).autoTable as autoTableInstanceType)({ body: [['test']] })
    assert(true)
  })
})
