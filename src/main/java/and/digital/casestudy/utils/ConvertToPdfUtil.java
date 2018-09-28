package and.digital.casestudy.utils;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;

import and.digital.casestudy.models.CaseStudy;

public class ConvertToPdfUtil {
	static Logger logger = LoggerFactory.getLogger(ConvertToPdfUtil.class);

	public static void convertToPdf(List<CaseStudy> caseStudies) {

		Document pdfRecord = new Document();
		logger.info("Creating PDF with the case studies provided");
		PdfPTable report;
		try {
			String home = System.getProperty("user.home");
			PdfWriter.getInstance(pdfRecord, new FileOutputStream(home + "//Downloads//myPdf.pdf"));
			pdfRecord.open();
			report = new PdfPTable(5);
			report.setWidthPercentage(100);
			report.setSpacingBefore(10f);
			report.setSpacingAfter(10f);
			PdfPCell cell;

			for (CaseStudy cs : caseStudies) {
				cell = new PdfPCell(new Paragraph(cs.getName()));
				report.addCell(cell);
				cell = new PdfPCell(new Phrase(cs.getClientName()));
				report.addCell(cell);
				cell = new PdfPCell(new Phrase(cs.getDescription()));
				report.addCell(cell);
				cell = new PdfPCell(new Phrase(cs.getSummary()));
				report.addCell(cell);
				cell = new PdfPCell(new Phrase(cs.getTags()));
				report.addCell(cell);
			}
			pdfRecord.add(report);

		} catch (FileNotFoundException | DocumentException e) {
			logger.error("Error creating PDF " + e);
		} finally {
			pdfRecord.close();
		}
	}
}
