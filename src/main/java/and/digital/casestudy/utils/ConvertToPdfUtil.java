package and.digital.casestudy.utils;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.util.List;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;

import and.digital.casestudy.models.CaseStudy;

public class ConvertToPdfUtil {

	public static void convertToPdf(List<CaseStudy> caseStudies) {

		Document pdfRecord = new Document();
		PdfPTable report;
		try {
			String home = System.getProperty("user.home");
			PdfWriter.getInstance(pdfRecord, new FileOutputStream(home + "//Downloads//myPdf.pdf"));
			pdfRecord.open();
			report = new PdfPTable(5);
			PdfPCell table_cell;

			for (CaseStudy cs : caseStudies) {
				table_cell = new PdfPCell(new Phrase(cs.getName()));
				report.addCell(table_cell);
				table_cell = new PdfPCell(new Phrase(cs.getClientName()));
				report.addCell(table_cell);
				table_cell = new PdfPCell(new Phrase(cs.getDescription()));
				report.addCell(table_cell);
				table_cell = new PdfPCell(new Phrase(cs.getSummary()));
				report.addCell(table_cell);
				table_cell = new PdfPCell(new Phrase(cs.getTags()));
				report.addCell(table_cell);
				pdfRecord.add(report);
			}
		} catch (FileNotFoundException | DocumentException e) {
			e.printStackTrace();
		} finally {
			pdfRecord.close();
		}
	}
}
